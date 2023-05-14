<script setup lang="ts">
import { computed, ref, withDefaults } from 'vue';

interface NewFSelectProps {
  modelValue?: string | number | Array<string | number>;
  label?: string;
  id?: string;
  options?: Array<{ value: string | number; label: string }>;
  disabled?: boolean;
  required?: boolean;
  selectClass?: string;
  multiple?: boolean;
  customOptions?: Array<{ value: string | number; label: string }>;
  optionsGroups?: Array<{ label: string; options: Array<{ value: string | number; label: string }> }>;
}

const props = withDefaults(defineProps<NewFSelectProps>(), {
  modelValue: '',
  label: '',
  id: '',
  options: () => [] as Array<{ value: string | number; label: string }>,
  disabled: false,
  required: false,
  selectClass: '',
  multiple: false,
  customOptions: () => [] as Array<{ value: string | number; label: string }>,
  optionsGroups: () => [] as Array<{ label: string; options: Array<{ value: string | number; label: string }> }>,
});

const emit = defineEmits(['update:modelValue', 'change']);

const onSelect = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLSelectElement).value);
};

const onChange = (event: Event) => {
  if (props.multiple) {
    const selectedOptions = (event.target as HTMLSelectElement).selectedOptions;
    const values = Array.from(selectedOptions).map((option: HTMLOptionElement) => option.value);
    emit('change', values);
  } else {
    emit('change', (event.target as HTMLSelectElement).value);
  }
};

const searchQuery = ref('');
const filteredOptions = computed(() => {
  return props.options.filter(option => option.label.toLowerCase().includes(searchQuery.value.toLowerCase()));
});
</script>

<template>
      <div p-4 bg-white border border-gray-300 rounded shadow-sm mb-4 relative>
        <label v-if="label" :for="id" mb-2 text-base>{{ label }}</label>
        <input v-model="searchQuery" type="text" placeholder="Поиск..." w-full py-2 mb-2 border-2 border-gray-300 rounded-md
          bg-gray-100 outline-none />
        <select :id="id" :value="modelValue" @input="onSelect" @change="onChange" :disabled="disabled" :required="required"
          :class="selectClass" :multiple="multiple" w-full p-2 bg-transparent border-none outline-none appearance-none
          cursor-pointer focus:outline-none>
          <slot v-if="customOptions" name="custom-option">
            <option v-for="(option, index) in customOptions" :key="index" :value="option.value">
              {{ option.label }}
            </option>
          </slot>
          <optgroup v-for="(group, index) in optionsGroups" :key="index" :label="group.label" v-if="optionsGroups">
            <option v-for="(option, optionIndex) in group.options" :key="optionIndex" :value="option.value">
              {{ option.label }}
            </option>
          </optgroup>
          <option v-for="(option, index) in filteredOptions" :key="index" :value="option.value">
            {{ option.label }}
          </option>
        </select>
  </div>
</template>
