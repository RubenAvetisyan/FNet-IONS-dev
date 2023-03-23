<script setup lang="ts">
const props = defineProps({
    id: {
        type: String,
        default: 'tab-content'
    },
    label: {
        type: String,
        default: 'content-tab'
    }
})

const componentId = computed(() => props.id as string)
const ariaLabelledby = computed(() => `${componentId.value}-tab`)
</script>

<template>
        <div :id="componentId" p="4 md:8" bg="white dark:gray-800" rounded="lg" role="tabpanel"
            :aria-labelledby="ariaLabelledby">
        <slot></slot>
    </div>
</template>
