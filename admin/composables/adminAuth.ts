import { acceptHMRUpdate, defineStore } from 'pinia'
// import hy from 'date-fns/locale/hy'
import { differenceInMilliseconds, format, parseISO } from 'date-fns'
import type { Ref } from '@vue/reactivity'
// import { $enum } from 'ts-enum-util'
import { UserGroupId } from '@/utils/enums'

export const useAdminAuthStore = defineStore('adminAuthStore', {
  state: () => ({
    user: {
      fullName: ''
    }
  }),

  getters: {
    getUser: state => {
      return useSession()
    },
    getSessionId: state => {
      const { data, status, lastRefreshedAt, getCsrfToken, getProviders } = useSession()
      return getCsrfToken
    }
  }
})


if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAdminStore, import.meta.hot))
