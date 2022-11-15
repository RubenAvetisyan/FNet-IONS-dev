import { useSetAutoSync, useSetSyncStatusMessage } from '../composables/autosync'

let intervalState = true
const setIntervalState = (state: boolean) => intervalState = state
export default defineNuxtPlugin(() => {
  let response: unknown = null
  const { pause, resume, isActive } = useSetAutoSync(async () => {
    response = await $fetch('/api/payments')
    console.log('response: ', response)
  }, 5000)

  if (!intervalState)
    pause()
  // addRouteMiddleware('db-syncronization', async () => {
  //     console.log('this global middleware was added in a plugin')
  //     if (isStopped) {

  //     } else {
  //         resume()
  //     }
  // }, { global: true })

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
