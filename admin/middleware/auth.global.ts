export default defineNuxtRouteMiddleware(async (to) => {
  if (!process.server)
    return

  const { user, setUser, isAdmin, isUser } = useAdminAuthStore()

  const token =
    useCookie('admin_token', { secure: true }).value || useCookie('user_token', { secure: true }).value

  if (token && !user.groupId?.length) {
    const { data } = await useFetch(`/api/decrypt?encrypted=${token}`)

    setUser(data.value)
  }

  const { userData } = useAdminAuthStore()

  console.log('user: ', userData)

  const isAdminOrUser = isAdmin || isUser

  if (isAdminOrUser && token && to.path === '/login')
    return navigateTo('/')

  if (to.path.includes('/admin') && !token && !isAdmin)
    navigateTo('/login')
  if (to.path.includes('/operations') && !token && !isUser)
    navigateTo('/login')

  if (to.meta.requiresAuth && !isAdminOrUser && !token && to.path !== '/login')
    return navigateTo('/login')
})
