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

const componentId = computed(() => `${props.id}-tab` as string)
const ariaLabelledby = computed(() => `${componentId.value}-tab`)

onBeforeMount(() => {
    nextTick(() => {
        console.log('btn.value: ', btn.value);
        if (props.selected)
            btn.value?.setAttribute("aria-selected", 'true')
    })
})
</script>

<template>
    <li class="w-full">
        <button :id="componentId" ref="btn" :data-tabs-target="`#${id}`" type="button" role="tab"
            :aria-controls="componentId" inline="block" w="full" p="4" rounded="tl-lg"
            bg="gray-50 hover:gray-100 dark:gray-700 dark:hover:gray-600" focus="outline-none">
            <slot></slot>
        </button>
    </li>
</template>
