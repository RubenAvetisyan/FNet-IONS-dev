export default defineNuxtRouteMiddleware(async (to) => {
  if (!process.server)
    return

  interface IUser {
    id: number
    fullName: string
    email: string
    type: string
    description: string
    groupId: number[]
  }

  type K = keyof IUser
  type V = typeof user[K]
  type Includes = [K, V]

  const { user, setUser } = useAdminAuthStore()

  const { value: token } = useCookie('admin_token', { secure: true })
  console.log('token: ', token)

  if (token && !user.groupId?.length) {
    let newUser = {} as Partial<IUser>
    const { decrypted: cred } = await $fetch(`/api/decrypt?encrypted=${token}`) as { decrypted: string }
    const parsedData = JSON.parse(cred) as [K, V][]

    parsedData.forEach(([k, v]: Includes) => newUser = { ...newUser, [k]: v })

    setUser(newUser)
  }

  const { userData } = useAdminAuthStore()
  const isAdmin = userData.groupId?.includes(UserGroupId.Admin)
  console.log('user: ', userData);
  const isUser = userData.groupId?.includes(UserGroupId.User)
  const isAdminOrUser = isAdmin || isUser

  if (to.meta.requiresAuth && !isAdminOrUser && !token && to.path !== '/login')
    return navigateTo('/login')

  console.log('isAdminOrUser: ', isAdminOrUser);
  if (isAdminOrUser && token && to.path === '/login')
    return navigateTo('/')

  // if (isAdmin && to.path !== '/admin')
  //   return navigateTo('/admin')
})
