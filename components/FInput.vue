<script setup>
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
})

const idNum = ref(0)

onMounted(() => {
  idNum.value = document.getElementsByTagName('input').length
  console.log('idNum.value: ', idNum.value)
})

const id = computed(() => props.id || `generated-input-${idNum.value}`)
const label = computed(() => props.label || id.value)

defineComponent({
  name: `${props.label}-${idNum.value}`,
})
</script>

<template>
  <div flex flex-col>
    <label v-if="$slots.name || label" :for="id" block mb-2 text-sm font-medium text-gray-900 dark:text-white>
      <slot v-if="!label" name="name" />
      <span v-else>{{ label }}</span>
    </label>
    <input
      :id="id" :key="id" type="text" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
      dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
      :placeholder="$slots.name || label" required :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>
