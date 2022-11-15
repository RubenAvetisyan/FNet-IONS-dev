export default defineNuxtConfig({
  extends: [
    './admin',
    './apiPaymentSystems',
    './log',
  ],
  head: {
    charset: 'utf-16',
    viewport: 'width=500, initial-scale=1',
    title: 'FNet Payment System',
    meta: [
      { name: 'description', content: 'Family Network Telecom Payment System' },
    ],
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  experimental: {
    reactivityTransform: true,
  },
  unocss: {
    preflight: true,
  },
  colorMode: {
    classSuffix: '',
  },
  runtimeConfig: {
    paymentSystems: {
      easypayTocke: process.env.NUXT_EasyPay_TOKEN,
    },
    syncConfig: {
      host: process.env.NUXT_DB_HOST,
      port: process.env.NUXT_DB_PORT,
      user: process.env.NUXT_DB_LOGIN,
      password: process.env.NUXT_DB_PASSWORD,
      database: process.env.NUXT_DB_NAME,
    },
  },

  theme: 'bitbucket',
  // {
  //   defaultTheme: 'dark',
  //   colors: {
  //     primary: '#4c17d0',
  //   },
  // }
})
