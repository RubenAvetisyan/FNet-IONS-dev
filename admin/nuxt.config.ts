export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false,
  },

  imports: {
    dirs: ['utils'],
  },

  components: {
    dirs: [
      {
        path: '@/admin/components',
        extensions: ['vue'],
        prefix: 'admin'
      }
    ]
  }
})
