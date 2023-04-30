<script setup>
import { SelectSearch } from '@unocss/vue-select'

const props = defineProps({
  value: {
    type: [String, Array],
    default: ''
  },
  options: {
    type: Array,
    default: () => []
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
  },
  selectAllOption: {
    type: String,
    default: ''
  },
  multiple: {
    type: Boolean,
    default: false
  },
  searchPlaceholder: {
    type: String,
    default: 'Поиск...'
  },
  clearable: {
    type: Boolean,
    default: false
  },
  emptyOption: {
    type: String,
    default: ''
  },
  maxSelected: {
    type: Number,
    default: 0
  }
})

defineEmits(['input'])

const search = ref('')

const sortedOptions = computed(() => {
  return props.options.sort((a, b) => a.label.localeCompare(b.label))
})
const selectedValues = computed(() => {
  return Array.isArray(props.value) ? props.value : [props.value]
})

const handleInput = (value) => {
  if (props.maxSelected && selectedValues.value.length >= props.maxSelected && !selectedValues.value.includes(value)) {
    return
  }
  emit('input', value)
}

const selectAll = (event) => {
  if (event.target.checked) {
    const allValues = props.options.map((option) => option.value)
    if (props.maxSelected && allValues.length > props.maxSelected) {
      emit('input', allValues.slice(0, props.maxSelected))
    } else {
      emit('input', allValues)
    }
  } else {
    emit('input', [])
  }
}

const reset = () => {
  emit('input', '')
  search.value = ''
}

const isGtMaxSelected = computed(() => props.maxSelected && selectedValues.length > props.maxSelected)
</script>

<template>
  <div w-full>
    <div relative>
      <SelectSearch :value="value" :options="sortedOptions" :disabled="disabled" :readonly="readonly" :required="required"
        :title="title" @input="handleInput" v-model="search" :placeholder="searchPlaceholder" :clearable="clearable"
        w-full p-2 border-2 rounded border-gray-300 transition duration-500 ease-in-out transform focus:border-blue-500>
        <template v-if="emptyOption" #empty="{ search }">
          <option value="">{{ emptyOption }}</option>
        </template>
      </SelectSearch>
      <div v-if="selectAllOption" absolute top-0 right-0 m-2 flex items-cente>
        <input type="checkbox" mr-2 @change="selectAll($event)" />
        <label>Выбрать все</label>
      </div>
      <div v-if="isGtMaxSelected" absolute bottom-0 left-0 text-red-500 text-xs italic mt-1 ml-2>
        Максимальное количество выбранных элементов: {{ maxSelected }}
      </div>
      <button v-if="clearable && value" focus:outline-none absolute top-0 right-0 m-2 p-2 rounded bg-gray-200
        text-gray-500 hover:bg-gray-300 @click="reset">
        Сбросить
      </button>
    </div>
  </div>
</template>
