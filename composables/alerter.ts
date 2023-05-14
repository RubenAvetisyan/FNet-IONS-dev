import { acceptHMRUpdate, defineStore } from 'pinia'
import { alertController } from '@ionic/vue'

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
  const message = ref<string[]>([])
  const alertType: Ref<AlertType> = ref(AlertEnumType.success)

  const isAlert = computed(() => message.value.length > 0)
  const alertMsg = computed(() => message.value)
  const alertIcon = computed(() => AlertIcon[alertType.value])
  const alertColor = computed(() => Color[alertType.value])

  watch(message, (msg) => {
    if (msg.length) {
      setTimeout(() => {
        message.value.splice(0, 1)
      }, 3000)
    }
  })

  async function setAlert(msg: string, alertTypeName: AlertType) {
    message.value.push(msg)
    alertType.value = alertTypeName

    const alert = await alertController.create({
      header: 'Ահազանգ',
      // subHeader: 'Important message',
      message: msg,
      buttons: [{
        text: 'ok',
        cssClass: 'f-btn'
      }],
      animated: true,
      cssClass: Color[alertTypeName],

    })

    await alert.present();
  }

  return {
    setAlert,
    isAlert,
    alertMsg,
    color: alertColor,
    icon: alertIcon,
    alertType,
    AlertEnumType,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAlertStore, import.meta.hot))
}
