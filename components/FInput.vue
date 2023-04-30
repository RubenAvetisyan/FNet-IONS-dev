<script setup lang="ts">
import { withDefaults } from 'vue';

interface FInputProps {
  modelValue?: string;
  label?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  disabled?: boolean;
  inputClass?: string;
}

const props = withDefaults(defineProps<FInputProps>(), {
  modelValue: '',
  label: '',
  id: '',
  type: 'text',
  placeholder: '',
  readonly: false,
  required: false,
  disabled: false,
  inputClass: '',
});

const emit = defineEmits(['update:modelValue']);

const onInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};
</script>

<template>
  <div flex flex-col mb-4>
    <label v-if="label" :for="id" mb-2>{{ label }}</label>
    <input :id="id" :type="type" :placeholder="placeholder" :value="modelValue" @input="onInput" :readonly="readonly"
      :required="required" :disabled="disabled" :class="inputClass" p-2 font-400 border b-1 b-rounded-1 outline-none
      h:w-0.5 h:py-2 h:px-3 h:text-base h:border h:border-gray-300 h:rounded h:shadow-sm h:focus:border-green-500
      h:focus:ring-1 h:focus:ring-green-500 h:focus:outline-none />
  </div>
</template>
