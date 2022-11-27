import type { Ref } from '@vue/reactivity'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { UserGroupId } from '@/utils/enums'

interface User {
  id: number
  fullName: string
  email: string
  type: string
  description: string
  groupId: number[]
}

export const useAdminAuthStore = defineStore('adminAuth', {
  state: () => ({
    sessionId: '',
    user: {},
  } as {
    sessionId: string
    user: User | { [key: string]: any }
  }),

  getters: {
    userData: state => state.user,
    isLogedin() {
      return this.isAdmin || this.isUser
    },
    isAdmin: state => !!state.user.groupId?.includes[UserGroupId.Admin],
    isUser: state => state.user.groupId?.length && !state.user.groupId?.includes[UserGroupId.Admin],
    userType: state => UserGroupName['Accountent'], // state.groupId
  },

  actions: {
    setUser(user: any) {
      this.user = user
    },
    async login<T extends Ref<string> | string>(username: T, password: T, setAlert?: (msg: string, type: 'warning' | 'success') => void) {

      const { data } = await useFetch('/api/auth?type=admin', {
        method: 'POST',
        body: { user: unref(username), password: unref(password) },
      })

      const user = data.value as User

      if (!data.value || !user.groupId.includes(UserGroupId.Admin)) {
        if (setAlert)
          setAlert('Սխալ տվյալներ', 'warning')
        return
      }
      const router = useRouter()

      if (setAlert)
        setAlert('Դուք հաջողությամբ նույնականացվեցիք․․․', 'success')

      router.replace('/admin')

      this.user = user
    },
    logout() {
      this.setUser({})
      $fetch('/api/logout?type=admin')
      return true
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAdminAuthStore, import.meta.hot))
