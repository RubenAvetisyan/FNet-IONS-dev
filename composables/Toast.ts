import { toastController } from '@ionic/vue'

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
  success = 'success',
  info = 'tertiary',
  warning = 'warningk',
  error = 'danger'
}

export const useToast = async (message: string, type: AlertType = 'success', duration = 2000, position: 'top' | 'middle' | 'bottom' = 'top') => {
  const toast = await toastController.create({
    message,
    duration,
    position,
    icon: AlertIcon[type],
    color: Color[type]
  })

  toast.present()
}
