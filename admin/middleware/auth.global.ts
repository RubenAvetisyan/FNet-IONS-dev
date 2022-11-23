import { dencrypt } from '@/utils/encryp-decrypt'

export default defineNuxtRouteMiddleware((to) => {
  if (!process.server) return

  const { sessionId } = useAdminAuthStore()
  console.log('isUserLogedin: ', sessionId)

  const { value: token } = useCookie('admin_token', { secure: true })
  console.log('token: ', token);

  if (token) {
    const cred = dencrypt(token)
    console.log('cred: ', cred);
  }


  // const isAdmin = cred.groupId?.includes(UserGroupId.Admin)

  if (to.meta.requiresAuth && !sessionId && to.path !== '/login')
    return navigateTo('/login')

  // if (isAdmin && to.path !== '/admin')
  //   return navigateTo('/admin')
})
