<script setup lang="ts">
definePageMeta({
  requiresAuth: true,
  layout: 'admin',
})
</script>

<template>
  <div w-full scroll-auto scrollbar>
    <NuxtPage />
    <!-- <Footer /> -->
      <StickyFooter bg-brand-primary bottom-0 />
  </div>
</template>
