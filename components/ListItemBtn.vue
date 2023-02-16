<script setup>
import { useSysStore } from '~~/composables/sysStore'

const props = defineProps({
  linksKey: {
    type: String,
    default: '',
  },
})

if (!props.linksKey)
  createError(`props.linksKey value is "${props.linksKey}"`)

const { setListItemBtn, toggleVisiblity } = useSysStore()
const key = setListItemBtn(props.linksKey)

const expand = () => toggleVisiblity(key)
</script>

<template>
  <div
    w="full" h-12 empty="hidden" flex items-center justify-center select-none bg="hover:brand-primary"
    text="base gray-900 dark:white hover:light-50" font="normal" duration="75" transition class="group" @click="expand"
  >
    <slot />
  </div>
</template>
