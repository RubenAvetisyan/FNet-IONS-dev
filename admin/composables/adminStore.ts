import { acceptHMRUpdate, defineStore } from 'pinia'

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
              link: '/'
            },
            {
              type: 'link',
              name: 'ABilling',
              icon: 'i-mdi-wallet-plus',
              link: '/'
            },
            {
              type: 'link',
              name: 'հաշվետվություններ',
              icon: 'i-mdi-chart-box-outline',
              link: '/user/statements'
            },
            {
              type: 'link',
              name: 'Համաժամացումների տեղեկագիր',
              icon: 'i-mdi-database-sync',
              link: '/admin/synclog'
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
          direct: true
        }
      ],
    },
    log: [] as PaymentsResponseType[],
  }),

  getters: {
    adminLeftPanel: state => state.leftPanel,
    logTable: state => {
      const header = state.log.length ? Object.keys(state.log[0]) : []
      const body = state.log.map(obj => {
        if (typeof obj === 'object' && !Array.isArray(obj))
          return Object.values(obj)
      }).filter(s => s)

      return {
        header,
        body
      }
    }
  },

  actions: {
    async setLog(date: Date | string) {

      const { data } = await useFetch('/api/get-abilling-payments', {
        method: 'POST',
        body: {
          date
        }
      })

      this.log = Array.isArray(data.value) ? data.value : []
    }
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAdminStore, import.meta.hot))
