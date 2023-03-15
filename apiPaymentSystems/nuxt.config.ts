export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    // 'nuxt-security',
  ],
  // security: {
  //   hidePoweredBy: false,
  // },

  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false,
  },

  css: [
    '@unocss/reset/tailwind.css',
  ],

  imports: {
    dirs: ['utils'],
  },

  runtimeConfig: {
    paymentSystems: {
      easypayTocke: process.env.NUXT_EasyPay_TOKEN,
    },
  },
})
