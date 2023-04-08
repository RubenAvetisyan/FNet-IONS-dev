<script setup lang="ts">
import { addDays, subDays, endOfMonth, endOfYear } from 'date-fns'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const options = [
  { text: 'Նախորդ օրը', value: '1' },
  { text: 'Վերջին 7 օրերին', value: '7' },
  { text: 'Վերջին 30 օրերին', value: '30' },
  { text: 'Վերջին ամսում', value: 'lastMonth' },
  { text: 'Վերջին տարում', value: 'lastYear' },
]

const selectedValue = ref('30')
const selectedOption = ref('Վերջին 30 օրերին')
const dropdownVisible = ref(false)

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value
}

const now = new Date()
const dateFrom = ref(now)
const dateTo = ref(now)

watch(
  () => props.modelValue,
  (newValue: Record<string, any>) => {
    dateFrom.value = newValue.dateFrom
    dateTo.value = newValue.dateTo
  },
  { deep: true }
)

const updateSelectedOption = (text: string, value: string) => {
  selectedOption.value = text
  // selectedValue.value = value
}

const updateDates = (value: string) => {
  const now = new Date()
  let dateFromValue
  let dateToValue = now

  switch (value) {
    case '1':
      dateFromValue = subDays(now, 1)
      break
    case '7':
      dateFromValue = subDays(now, 7)
      break
    case '30':
      dateFromValue = subDays(now, 30)
      break
    case 'lastMonth':
      dateFromValue = subDays(endOfMonth(now), 30)
      break
    case 'lastYear':
      dateFromValue = subDays(endOfYear(now), 365)
      break
  }

  emit('update:modelValue', { dateFrom: dateFromValue, dateTo: dateToValue })
}
</script>

<template>
  <div w-48>
    <button id="dropdownRadioButton"
      class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      type="button" @click="toggleDropdown">
      <div i-mdi-update mr-1></div>
      {{ selectedOption }}
      <dir i-mdi-chevron-down m-0 p-0></dir>
    </button>
    <!-- Dropdown menu -->
    <div v-show="dropdownVisible"
      class="z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
      data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" style="position: absolute;">
      <ul class=" p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
        <li v-for="(option, index) in options" :key="index">
          <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
            @click="() => updateSelectedOption(option.text, option.value)">
            <input :id="'filter-radio-example-' + index" type="radio" :value="option.value" v-model="selectedValue"
              @change="updateDates(option.value)" name="filter-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label :for="'filter-radio-example-' + index"
              class="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
              {{ option.text }}</label>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
