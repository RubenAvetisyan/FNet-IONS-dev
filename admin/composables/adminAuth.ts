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
  }
})


if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAdminAuthStore, import.meta.hot))
