import { acceptHMRUpdate, defineStore } from 'pinia'
import { Ref } from 'vue'

export const useAlertStore = defineStore('alert', () => {
    /**
     * Current named of the user.
     */
    const message = shallowRef('')
    const alertType: Ref<'success' | 'info' | 'warning'> = ref('success')

    const isAlert = computed(() => !!message.value)
    const alertMsg = computed(() => message.value)

    /**
     * Changes the current name of the user and saves the one that was used
     * before.
     *
     * @param msg - new alert message to set
     */
    function setAlert(msg: string, alertTypeName: 'success' | 'info' | 'warning') {
        message.value = msg
        alertType.value = alertTypeName

        useTimeoutFn(() => message.value = '', 3000, { immediate: true })
    }

    return {
        setAlert,
        isAlert,
        alertType,
        alertMsg,
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useAlertStore, import.meta.hot))