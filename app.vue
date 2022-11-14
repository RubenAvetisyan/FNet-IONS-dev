<script setup>
useHead({
  title: 'FNet Payment System',
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/icon.png',
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
