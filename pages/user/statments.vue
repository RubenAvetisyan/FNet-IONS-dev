<script setup lang="ts">
definePageMeta({
    requiresAuth: true,
    layout: 'user'
})
</script>

<template>
    <div>
        <NuxtPage />
        <!-- <Footer /> -->
        <StickyFooter />
    </div>
</template>