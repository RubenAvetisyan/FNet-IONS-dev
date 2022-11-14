<script setup>
const props = defineProps({
  text: {
    type: [String, null],
    default: null,
  },
})

// watch(() => props.text, (text) => {
//   console.log('text: ', text)
// })
</script>

<template>
  <div>
    <label for="message" block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400>
      Payment request log
    </label>
    <textarea
      id="logarea" block p-1.5 w-full h-full text-sm text-gray-900 bg-gray-50 rounded-lg border
      border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
      dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
      :placeholder="!text ? 'logging...' : ''" :value="text"
    />
  </div>
</template>
