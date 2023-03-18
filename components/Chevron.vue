<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: true
  },
  isUp: {
    type: Boolean,
    default: false
  }
})

const chevron = computed(() => props.isUp ? 'i-mdi-sort-bool-descending-variant' : 'i-mdi-sort-bool-ascending-variant')
</script>

<template>
    <div bg="indigo-100-100 dark:indigo-700" text="gray-800 xs dark:light-400" font-medium flex="inline" items-center
      rounded="xl" m="r-2" border="b indigo-500">
      <span v-if="active" :class="[chevron, 'bg-gray-800 xs dark:bg-light-400']"></span>
      <span v-else i-mdi-sort bg-gray-800 xs dark:bg-light-400></span>
    </div>
</template>
