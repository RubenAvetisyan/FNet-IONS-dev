<script setup lang="ts">
const props = defineProps({
    id: {
        type: String,
        default: 'control'
    },
    selected: {
        type: Boolean,
        default: false
    }
})

const btn = ref<HTMLElement>()

const componentId = computed(() => useGenerateUniqueId(`${props.id}-tab`) as string)
const ariaLabelledby = computed(() => `${componentId.value}-tab`)

onMounted(() => {
    nextTick(() => {
        if (props.selected)
            btn.value?.setAttribute("aria-selected", 'true')
    })
})
</script>

<template>
    <li class="w-full">
        <button :id="componentId" ref="btn" :data-tabs-target="`#${id}`" type="button" role="tab"
            :aria-controls="componentId" inline="block" w="full" p="4" rounded="tl-lg"
                bg="gray-50 hover:gray-100 dark:gray-700 dark:hover:gray-600" focus="outline-none" text-brand-secondary
                dark:text-brand-secondaryDark>
            <slot></slot>
        </button>
    </li>
</template>
