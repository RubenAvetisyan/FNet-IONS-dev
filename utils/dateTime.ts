import { differenceInSeconds, format, max, parseISO, startOfToday } from 'date-fns'

export const formatToSqlDate = (date: Date | string | number, returnFormat = 'yyyy-MM-dd HH:mm:SS') => {
  try {
    date = typeof date === 'string' ? parseISO(date) : date
    return format(date, returnFormat, { weekStartsOn: 1 })
  }
  catch (error) {
    console.log('error: ', error)
  }
}
