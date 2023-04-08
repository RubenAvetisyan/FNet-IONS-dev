import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'
import login from '~/admin/utils/login';
import { H3Error } from 'h3';
import { deafultRuels, RuleKey } from '@@/utils/system/rules'

// TODO: Make this more scalable and reusable, remove from here

export default NuxtAuthHandler({
  pages: {
    // Change the default behavior to use `/login` as the path for the sign-in page
    signIn: '/login',
    signOut: '/'
  },
  callbacks: {
    // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn && token) {
        // token.jwt = user ? (user as any).type || '' : '';
        token.id = user ? user?.id || '' : '';
        token.rule = user ? (user as any)?.rule || '' : '';
        token.type = user ? (user as any)?.type || '' : '';
      }
      return Promise.resolve(token);
    },
    // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
    session: async ({ session, token }) => {
      (session as any).role = token.type;
      (session as any).region = token.rule;
      (session as any).uid = token.id;
      return Promise.resolve(session);
    },
  },
  // A secret string you define, to ensure correct encryption
  secret: 'process.env.AUTH_SECRET', // TODO: change it!
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Մուտքանուն', type: 'text', placeholder: '(hint: ruben.avetisyan@fnet.am)' },
        password: { label: 'Գաղտնաբառ', type: 'password', placeholder: '(hint: inchvorpassword)' }
      },
      async authorize(credentials: { username: string, password: string }, req: any) {
        try {
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // NOTE: THE BELOW LOGIC IS NOT SAFE OR PROPER FOR AUTHENTICATION!

          // const user = { id: '1', name: 'J Smith', username: 'jsmith', password: 'hunter2' }

          const user = await login(credentials.username, credentials.password)
          if (user instanceof H3Error)
            throw user
          console.log('response: ', user);


          if (user.groupId.length && user.fullName) {
            // Any object returned will be saved in `user` property of the JWT
            return {
              id: user.id + '',
              name: user.fullName,
              type: user.type,
              rule: deafultRuels[user.id + '' as RuleKey]
            }
          } else {
            // eslint-disable-next-line no-console
            console.error('Warning: Malicious login attempt registered, bad credentials provided')

            // If you return null then an error will be displayed advising the user to check their details.
            return null

            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } catch (error) {
          console.log('error: ', error);
        }
      }
    })
  ]
})
