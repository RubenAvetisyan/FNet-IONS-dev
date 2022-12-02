export default defineNuxtPlugin(() => {
    const loading = ref(false)
    const start = () => loading.value = true
    const finish = () => loading.value = false

    return {
        provide: {
            startLoading: start,
            finishLoading: finish,
            isLoading: loading
        }
    }
})