export default defineNuxtRouteMiddleware(async (to) => {
  const { setUser, isLogedin, setSessionId } = useAdminAuthStore()

  const token
    = useCookie('admin_token').value || useCookie('user_token').value

  if (process.server)
    setSessionId(token || '')

  console.log('token: ', token)
  if (token && !isLogedin) {
    const { data } = await useFetch(`/api/decrypt?encrypted=${token}`)

    if (!data.value)
      return
    setUser(data.value)
  }
})
