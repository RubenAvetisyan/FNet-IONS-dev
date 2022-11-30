export default defineNuxtRouteMiddleware((to) => {
  const { isAdmin, isUser } = useAdminAuthStore()
  // if (to.query.login === 'false') {
  //   createError('SDFJ SDFLKJ')
  //   return navigateTo('/', {
  //     redirectCode: 401,
  //   })
  //   // return abortNavigation()
  // }
  // return navigateTo('/')

  if (to.path.includes('admin') && isAdmin)
    setPageLayout('admin')
  else if (to.path.includes('operations') && isUser)
    setPageLayout('user')
  else 
    setPageLayout('default')
})
