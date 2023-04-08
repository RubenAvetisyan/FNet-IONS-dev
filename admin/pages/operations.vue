<script setup>
definePageMeta({
  layout: 'user',
  key: route => route.fullPath,
})

const links = ref([
  { name: 'Dashboard', link: '/admin' },
  { name: 'Payment API', link: '/payment' },
  { name: 'Operations', link: '/operations' },
  { name: 'Pricing', link: '/price' },
  { name: 'Contact', link: '/contact' },
])
</script>

<template>
  <div class="w-full h-full">
    <!-- <Header /> -->
    <navbar top-0 right-12 mx-auto w-full justify-space-between>
      <template #logo>
        <FullLogoButton />
      </template>
      <template #listItems>
        <n-list-item v-for="l in links" :key="l.name" :link="l.link" :exact="l?.exact" :external="l?.external">
          {{ l.name }}
        </n-list-item>
      </template>
    </navbar>

    <NuxtPage />

    <!-- <Footer /> -->
    <StickyFooter />
  </div>
</template>
