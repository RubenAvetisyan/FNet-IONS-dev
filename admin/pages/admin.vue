<script setup lang="ts">
definePageMeta({
    requiresAuth: true,
    layout: 'admin'
})
</script>

<template>
    <div>
        <NuxtPage />
        <!-- <Footer /> -->
        <StickyFooter />
    </div>
</template>
