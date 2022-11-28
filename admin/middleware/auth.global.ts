export default defineNuxtRouteMiddleware(async (to) => {
  if (!process.server)
    return

  const { user, setUser, isAdmin, isUser } = useAdminAuthStore()

  const { value: token } = useCookie('admin_token', { secure: true })
  console.log('token: ', token)

  if (token && !user.groupId?.length) {
    const { decrypted } = await $fetch(`/api/decrypt?encrypted=${token}`)

    setUser(decrypted)
  }

  const { userData } = useAdminAuthStore()

  console.log('user: ', userData)

  const isAdminOrUser = isAdmin || isUser

  if (isAdminOrUser && token && to.path === '/login')
    return navigateTo('/')

  if (to.path.includes('/admin') && !token && !isAdmin)
    navigateTo('/login')

  if (to.meta.requiresAuth && !isAdminOrUser && !token && to.path !== '/login')
    return navigateTo('/login')

  // if (isAdmin && to.path !== '/admin')
  //   return navigateTo('/admin')
})
