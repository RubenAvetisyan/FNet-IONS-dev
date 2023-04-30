<template>
  <div w-full>
    <input w-full p-2 border-2 rounded border-gray-300 transition duration-500 ease-in-out transform focus:border-blue-500
      :class="{ 'border-red-500': showError }" :type="type" :value="value" :placeholder="placeholder" :disabled="disabled"
      :readonly="readonly" :required="required" :title="title" @input="$emit('input', $event.target.value)"
      @focus="isFocused = true" @blur="isFocused = false" />
    <p v-if="showError" class="text-red-500">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  value: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  }
})

const isFocused = ref(false)
const showError = ref(false)

const errorMessage = computed(() => 'Введите корректный адрес электронной почты')

</script>
