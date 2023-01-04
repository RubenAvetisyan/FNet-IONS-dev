import { differenceInSeconds, format, max, startOfToday, parseISO } from 'date-fns'

export const formatToSqlDate = (date: Date | string | number) => {
    try {
        date = typeof date === 'string' ? parseISO(date) : date
        return format(date, 'yyyy-MM-dd HH:mm:SS', { weekStartsOn: 1 })
    } catch (error) {
        console.log('error: ', error);
    }
}