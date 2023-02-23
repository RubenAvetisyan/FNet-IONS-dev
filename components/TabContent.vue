<script setup lang="ts">
defineProps({
    id: {
        type: String,
        default: 'content'
    },
    label: {
        type: String,
        default: 'content-tab'
    }
})
</script>

<template>
    <div :id="id" p="4 md:8" bg="white dark:gray-800" rounded="lg" role="tabpanel" :aria-labelledby="`${id}-tab`">
        <slot></slot>
    </div>
</template>