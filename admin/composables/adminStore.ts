import { acceptHMRUpdate, defineStore } from 'pinia'
// import hy from 'date-fns/locale/hy'
import { differenceInMilliseconds, format, parseISO } from 'date-fns'

export const formatSimpleDate = (date: Date | number) => format(date, 'yyyy-MM-dd')
const defaultStartDate = formatSimpleDate(Date.now()) as string
export const useAdminStore = defineStore('adminStore', {
  state: () => ({
    basePath: '/admin',
    leftPanel: {
      list: [
        {
          type: 'button',
          name: 'Վճարային համակարգեր',
          icon: 'i-mdi-bank-transfer',
          sub: [
            {
              type: 'link',
              name: 'Lan-Billing',
              icon: 'i-mdi-wallet-outline',
              link: '/',
            },
            {
              type: 'link',
              name: 'ABilling',
              icon: 'i-mdi-wallet-plus',
              link: '/',
            },
            {
              type: 'link',
              name: 'հաշվետվություններ',
              icon: 'i-mdi-chart-box-outline',
              link: '/user/statements',
            },
            {
              type: 'link',
              name: 'Համաժամացումների տեղեկագիր',
              icon: 'i-mdi-database-sync',
              link: '/admin/synclog',
            },
          ],
        },
        {
          type: 'link',
          link: '/admin/administrating',
          name: 'Ադմինիստրավորում',
          icon: 'i-mdi-view-dashboard-edit',
        },
        {
          type: 'link',
          href: 'http://localhost:3001/admin',
          name: 'Կցել Telegram',
          icon: 'i-mdi-account-plus',
          direct: true,
        },
      ] as AdminStoreList[],
    },
    log: [] as GetPaymentsResponse[],
    logStartDate: '' || defaultStartDate,
  }),

  getters: {
    adminLeftPanel: state => state.leftPanel,
    logTable: (state) => {
      const header = state.log.length ? Object.keys(state.log[0]) : []
      const body = state.log.map((obj) => {
        // if (typeof obj === 'object' && !Array.isArray(obj))
        return Object.values(obj)
      })
      // .filter(s => s)

      return {
        header,
        body,
      }
    },
    logDate: (state) => {
      return state.logStartDate
    },
  },

  actions: {
    async setLog(date: QueryDate) {
      const dates = { ...date }

      dates.dateFrom = setDateFrom(date.dateFrom)
      dates.dateTo = setDateTo(date.dateTo)
      const difference = differenceInMilliseconds(parseISO(dates.dateTo), parseISO(dates.dateFrom))

      if (difference < 0)
        return 'Not done'

      const { data } = await useFetch('/api/get-abilling-payments', {
        method: 'POST',
        body: {
          date: dates,
        },
      })

      this.log = []

      if (Array.isArray(data.value)) {
        this.log = data.value
          .map((item) => {
            const key = 'Syncronization Date'
            item[key] = item[key].replace('T', ' ').replace('.000Z', '')
            return item
          })
      }

      return 'Done'
    },
    setLogStartDate(dateFrom: Date | string) {
      this.logStartDate = dateFrom instanceof Date ? formatSimpleDate(dateFrom) : formatSimpleDate(parseISO(dateFrom))
    },
  },
  // persist: true
})

function setFormat(d: Date | number) {
  return format(d, 'yyyy-MM-dd')
}

function setDateFrom(d: Date | number | string) {
  return typeof d !== 'string' ? setFormat(d) : setFormat(parseISO(d))
}

function setDateTo(d: Date | number | string | undefined) {
  if (!d)
    return ''
  return typeof d !== 'string' ? setFormat(d) : setFormat(parseISO(d))
}

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAdminStore, import.meta.hot))
