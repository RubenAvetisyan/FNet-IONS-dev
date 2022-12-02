import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAdminStore = defineStore('adminStore', {
  state: () => ({
    basePath: '/admin',
    leftPanel: {
      list: [
        {
          type: 'button',
          name: 'Վճարումային համակարգեր',
          icon: 'i-mdi-credit-card-outline',
          sub: [
            {
              type: 'link',
              name: 'Lan-Billing',
              icon: 'i-mdi-credit-card',
              link: '/'
            },
            {
              type: 'link',
              name: 'ABilling',
              icon: 'i-mdi-credit-card-check-outline',
              link: '/'
            },
            {
              type: 'link',
              name: 'հաշվետվություններ',
              icon: 'i-mdi-chart-box-outline',
              link: '/'
            },
            {
              type: 'link',
              name: 'Համաժամացումների տեղեկագիր',
              icon: 'i-mdi-sync-circle',
              link: '/log'
            },
          ],
        },
        {
          type: 'link',
          link: '/admin/administrating',
          name: 'Ադմինիստրավորում',
          icon: 'i-mdi-view-dashboard-edit',
        },
      ],
    },
  }),

  getters: {
    adminLeftPanel: state => state.leftPanel,
  },

  actions: {},
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAdminStore, import.meta.hot))
