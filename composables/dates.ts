import { format, isSameDay, parseISO, differenceInDays, } from 'date-fns';

const dateFromValue = ref<Date | number>(parseISO('2022-03-01'))
const dateToValue = ref<Date | number>(Date.now())

const dateFrom = computed({
  get() {
    const isDate = typeof dateFromValue.value === 'number' || typeof dateFromValue.value === 'object'
    return isDate ? format(dateFromValue.value, 'yyyy-MM-dd') : dateFromValue.value
  },
  set(val) {
    const value = typeof val === 'string' ? parseISO(val) : val
    // if (differenceInDays(value, dateToValue.value) > 0 || differenceInDays(value, Date.now()) > 0) {
    //   return
    // }
    dateFromValue.value = value
  }
})
const dateTo = computed({
  get() {
    const isDate = typeof dateToValue.value === 'number' || typeof dateToValue.value === 'object'
    return isDate ? format(dateToValue.value, 'yyyy-MM-dd') : dateToValue.value
  },
  set(val) {
    const value = typeof val === 'string' ? parseISO(val) : val
    // if (differenceInDays(value, dateFromValue.value) <= 0 || differenceInDays(value, Date.now()) > 0) {
    //   return
    // }
    dateToValue.value = value
  }
})

export const useDate = () => ({
  dateFromValue, dateToValue,
  dateFrom, dateTo
})

export const useDateRange = () => computed({
  get() {
    return { dateFrom: dateFrom.value, dateTo: dateTo.value }
  },
  set(value) {
    dateFrom.value = value.dateFrom
    dateTo.value = value.dateTo
  },
})
