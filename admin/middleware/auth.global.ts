// import { useAuthStore } from '../stores/auth.store'

export default defineNuxtRouteMiddleware((to) => {
    const { isUserLogedin } = useAuthStore()
    console.log('isUserLogedin: ', isUserLogedin);

    if (to.meta.requiresAuth && !isUserLogedin && to.path !== '/login') {
        return navigateTo('/login')
    }

    if (to.query.login === 'true') {
        return navigateTo('/admin')
    }
})
