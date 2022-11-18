export default defineNuxtRouteMiddleware((to, from) => {

  if (to.query.login === 'false') {
    createError('SDFJ SDFLKJ')
    return navigateTo('/', {
      redirectCode: 401
    })
    // return abortNavigation()
  }
  // return navigateTo('/')

  if (to.path.includes('admin')) {
    setPageLayout('admin')
  }
})