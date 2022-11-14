export default defineNuxtConfig({
  extends: [
    './admin',
    './apiPaymentSystems',
    './log'
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

  theme: {
    dark: true,
    colors: {
      primary: '#4c17d0',
    },
  },
})
