export default defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.hook('app:beforeMount', (app) => {
    app.$nuxt.provide('telegramBot', (id: number, msg: string) => {
      if (!process.server || !id)
        return
      botInstance?.instance?.sendMessage(id, msg)
    })
  })
  const { telegramBot } = await import('../telegram-bot')
  const { telegram } = useRuntimeConfig()
  const botInstance = telegramBot(telegram.botToken)
  return {
    provide: {},
  }
})
