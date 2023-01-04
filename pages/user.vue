<script setup lang="ts">
definePageMeta({
    requiresAuth: true,
    layout: 'user'
})
</script>

<template>
    <div h-full>
        <NuxtPage h-sceen />
        <!-- <Footer /> -->
        <StickyFooter />
    </div>
</template>
