import { acceptHMRUpdate, defineStore } from 'pinia'
// import hy from 'date-fns/locale/hy'
import { differenceInMilliseconds, format, parseISO } from 'date-fns'
// import { $enum } from 'ts-enum-util'
import { UserGroupId } from '@/utils/enums'
import { SessionData } from '@sidebase/nuxt-auth/dist/runtime/composables/useAuthState'
UserGroupId.Admin
export const useAdminAuthStore = defineStore('adminAuthStore', {
  state: () => ({
    user: {
      fullName: ''
    },
    adminIds: ['135', '75', '80', '78']
  }),

  getters: {
    isAdmin(): boolean {
      const { data } = useAuth()
      const userInfo = data.value as SessionData & { uid: string; region: string }
      const currentUserId = userInfo.uid
      return this.adminIds.includes(currentUserId)
    }
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAdminAuthStore, import.meta.hot))
