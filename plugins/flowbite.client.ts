// import flowbite from 'flowbite'

// const flowbite = require('flowbite')

export default defineNuxtPlugin(async (nuxtApp) => {
  const flowbite = await import('flowbite').then(lib => lib.default || lib)
  nuxtApp.vueApp.use(() => flowbite)
})
