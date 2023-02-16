<script>
export default {
  props: {
    modelValue: {
      type: [String, Date],
      default: () => Date.now(),
    },
    name: {
      type: String,
      default: 'DateInput',
    },
    label: {
      type: String,
      default: '',
    },
  },

  setup(props, context) {
    const updateValue = (event) => {
      context.emit('update:modelValue', event.target.value)
    }

    return { updateValue }
  },
}
</script>

<template>
  <div class="relative max-w-55 text-center">
    <label v-if="label" for="startDate" w-full text-center text-sm font-medium> {{ label }} </label>
    <input
      :id="name" type="date" :name="name" :value="modelValue" max-h-8 bg-gray-50 border border-gray-300
      text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 p-2.5
      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
      dark:focus:border-blue-500 @change="updateValue"
    >
  </div>
</template>
