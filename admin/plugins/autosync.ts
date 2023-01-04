import { useSetAutoSync, useSetSyncStatusMessage } from '../composables/autosync'

let intervalState = false
const setIntervalState = (state: boolean) => intervalState = state
export default defineNuxtPlugin(() => {
  let response: unknown = null
  const { pause, resume, isActive } = useSetAutoSync(async () => {
    response = await $fetch('/api/payments')
    console.info('response: ', response)
  }, 5000, {})

  if (!intervalState)
    pause()

  return {
    provide: {
      autoSync: () => ({
        pause: () => {
          pause()
          setIntervalState(false)
        },
        resume: () => {
          resume()
          setIntervalState(true)
        },
        isActive,
      }),
      isActive,
      autoSyncMessage: () => useSetSyncStatusMessage(unref(isActive)),
      getResponse: () => response,
      setIntervalState: (state: boolean) => intervalState = state,
    },
  }
})
