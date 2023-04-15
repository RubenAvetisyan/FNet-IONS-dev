export default defineNuxtRouteMiddleware(to => {
  // skip middleware on server
  if (process.server) {
    const { data: userInfo } = useAuth()
    const admins = ['135', '75', '80', '78']
    if (admins.includes(userInfo.value?.uid)) {
      navigateTo('/user/statements/totalClients')
    }
  }
  // skip middleware on client side entirely
  if (process.client) {
    const { data: userInfo } = useAuth()
    const admins = ['135', '75', '80', '78']
    if (admins.includes(userInfo.value?.uid)) {
      navigateTo('/user/statements/totalClients')
    }
  }
  // or only skip middleware on initial client load
  const nuxtApp = useNuxtApp()
  if (process.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) return
})
