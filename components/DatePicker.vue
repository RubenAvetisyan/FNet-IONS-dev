<script>
import { parseISO } from 'date-fns'
import { format } from 'date-fns'
import { hy } from 'date-fns/locale'
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
    isDisabled: {
      type: Boolean,
      default: false
    },
    dateType: {
      type: String,
      default: 'date'
    }
  },

  setup(props, context) {
    const updateValue = (event) => {
      const date = new Date(event.target.value)
      if (props.dateType === 'month') date.setDate(1)
      context.emit('update:modelValue', date)
    }

    const formatDate = (date) => {
      const dt = typeof date === 'string' ? parseISO(date) : date
      const formatString = props.dateType === 'date' ? 'yyyy-MM-dd' : 'yyyy-MM'
      return format(dt, formatString, { locale: hy })
    }

    return { updateValue, formatDate }
  },
}
</script>

<template>
    <div class="relative max-w-55 text-center">
      <label v-if="label" for="startDate" w-full text-center text-sm font-medium> {{ label }} </label>
      <input :id="name" :type="dateType" :name="name" :value="formatDate(modelValue)" :disabled="isDisabled" max-h-8
        bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block
        w-full pl-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
        dark:focus:ring-blue-500 dark:focus:border-blue-500 @change="updateValue">
  </div>
</template>
