import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', () => {
    /**
     * Current named of the user.
     */
    const message = shallowRef('')

    const isAlert = computed(() => !!message.value)
    const alertMsg = computed(() => message.value)

    /**
     * Changes the current name of the user and saves the one that was used
     * before.
     *
     * @param msg - new alert message to set
     */
    function setAlert(msg: string) {
        message.value = msg


        useTimeoutFn(() => message.value = '', 3000, { immediate: true })
    }

    return {
        setAlert,
        isAlert,
        alertMsg,
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useAlertStore, import.meta.hot))