import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Ref } from 'vue'

enum AlertEnumType {
  success = 'success',
  info = 'info',
  warning = 'warning',
  error = 'error'
}

type AlertType = 'success' | 'info' | 'warning' | 'error' | AlertEnumType

enum AlertIcon {
  success = 'i-mdi-check-circle-outline',
  info = 'i-mdi-information-outline',
  warning = 'i-mdi-alert',
  error = 'i-mdi-alert-circle-outline'
}

enum Color {
  success = 'text-green-6 dark:text-green-2 bg-green-1 dark:bg-green-6',
  info = 'text-blue-7 dark:text-blue-2 bg-blue-1 dark:bg-blue-6',
  warning = 'text-brand-pink dark:text-red-2 bg-red-2 dark:bg-brand-pink',
  error = 'text-light dark:text-red-50 bg-red-6 dark:bg-red-5'
}

export const useAlertStore = defineStore('alert', () => {
  /**
     * Current named of the user.
     */
  const message = ref<string[]>([])
  const alertType: Ref<AlertType> = ref(AlertEnumType.success)

  const isAlert = computed(() => message.value.length, {
    onTrigger(event) {
      console.log('event: ', event);
      if (event.newValue && event.type === 'add')
        useTimeoutFn(() => {
          message.value.splice(0, 1)
        }, 3000, { immediate: true })
    },
  })
  const alertMsg = computed(() => message.value)
  const alertIcon = computed(() => AlertIcon[alertType.value])
  const alertColor = computed(() => Color[alertType.value])

  /**
     * Sets the Alert message.
     * It is important to set alert type.
     *
     * @param msg - new alert message to set
     */
  function setAlert(msg: string, alertTypeName: AlertType) {
    message.value.push(msg)
    alertType.value = alertTypeName
    console.log('alertType.value: ', alertType.value);
  }

  return {
    setAlert,
    isAlert: isAlert.value,
    alertMsg: alertMsg.value,
    color: alertColor.value,
    icon: alertIcon.value,
    alertType: alertType.value,
    AlertEnumType,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAlertStore, import.meta.hot))
}
