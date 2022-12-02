export default defineNuxtRouteMiddleware(async (to) => {
  const { user, setUser, isAdmin, isUser, isLogedin } = useAdminAuthStore()

  const token =
    useCookie('admin_token').value || useCookie('user_token').value

  console.log('token: ', token);
  if (token && !isLogedin) {
    const { data } = await useFetch(`/api/decrypt?encrypted=${token}`)

    if (!data.value) return
    setUser(data.value)
  }

})
