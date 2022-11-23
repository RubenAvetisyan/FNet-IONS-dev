export default defineNuxtConfig({
  extends: [
    './admin',
    './apiPaymentSystems',
    './log',
  ],
  head: {
    charset: 'utf-16',
    viewport: 'width=500, initial-scale=1',
    title: 'FNet Power system',
    meta: [
      { name: 'description', content: 'Internal operations implementation system' },
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
    attributify: true,
    icons: true,
  },
  colorMode: {
    classSuffix: '',
  },

  imports: {
    dirs: ['config', 'utils'],
  },

  runtimeConfig: {
    lanbilling: {
      host: process.env.NUXT_DB_LanBilling_HOST,
      port: process.env.NUXT_DB_LanBilling_PORT,
      user: process.env.NUXT_DB_LanBilling_LOGIN,
      password: process.env.NUXT_DB_LanBilling_PASSWORD,
      database: process.env.NUXT_DB_LanBilling_NAME,
    },
    abilling: {
      host: process.env.NUXT_DB_ABilling_HOST,
      port: process.env.NUXT_DB_ABilling_PORT,
      user: process.env.NUXT_DB_ABilling_LOGIN,
      password: process.env.NUXT_DB_ABilling_PASSWORD,
      database: process.env.NUXT_DB_ABilling_NAME,
    },
    erp: {
      host: process.env.NUXT_DB_ERP_HOST,
      port: process.env.NUXT_DB_ERP_PORT,
      user: process.env.NUXT_DB_ERP_LOGIN,
      password: process.env.NUXT_DB_ERP_PASSWORD,
      database: process.env.NUXT_DB_ERP_NAME,
    },
  },

  reactStrictMode: true,
  swcMinify: true,
})
