<script setup lang="ts">

import { initFlowbite } from 'flowbite'
useHead({
  title: 'FNet Payment System',
  htmlAttrs: {
    lang: 'hy',
  },
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/icon.png',
    },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
  ],
})

const headers = useRequestHeaders(['cookie']) as HeadersInit
const { data: token } = await useFetch('/api/token', { headers })
console.log('token: ', token.value);

onMounted(() => {
  initFlowbite();
})


const { data: userInfo } = useAuth()
const { uid = '' } = userInfo.value || {}

const isRuben = ['75', '80'].includes(uid)

</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
