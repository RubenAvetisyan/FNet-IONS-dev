import type { Ref } from '@vue/reactivity'
import { acceptHMRUpdate, defineStore } from 'pinia'
// import { $enum } from 'ts-enum-util'
import { UserGroupId } from '@/utils/enums'

interface User {
  id: number
  fullName: string
  email: string
  type: string
  description: string
  groupId: number[]
}

// const appConfig = useAppConfig()
// 

export const useAdminAuthStore = defineStore('adminAuth', {
  state: (): {
    sessionId: string
    user: User | null
  } => ({
    sessionId: '',
    user: null,
  }),

  getters: {
    userData: state => state.user,
    isLogedin(): boolean {
      return this.isAdmin || this.isUser
    },
    isAdmin(): boolean {
      if (!this.userData)
        return false

      return this.userData?.groupId?.includes(UserGroupId.Admin)
    },
    isUser(): boolean {
      if (!this.user)
        return false
      return !this.isAdmin
    },
    userType: state => state.user?.type,
    getSessionId: state => state.sessionId,
  },

  actions: {
    setUser(user: any) {
      this.user = user
    },
    setSessionId(token: string) {
      this.sessionId = token
    },
    async login<T extends Ref<string> | string>(username: T, password: T, setAlert?: (msg: string, type: 'warning' | 'success') => void) {
      const { $startLoading, $finishLoading } = useNuxtApp()

      $startLoading()

      const { data } = await useFetch('/api/auth?type=admin', {
        method: 'POST',
        body: { user: unref(username), password: unref(password) },
      })

      $finishLoading()

      
      const user = data.value as unknown as User

      if (!data.value)
        return setAlert ? setAlert('Սխալ տվյալներ', 'warning') : true

      const router = useRouter()

      if (setAlert)
        setAlert('Դուք հաջողությամբ նույնականացվեցիք․․․', 'success')

      
      this.user = user

      if (this.isAdmin)
        router.replace('/admin')
      else
        router.replace('/operations')
    },
    async logout() {
      
      const router = useRouter()
      const loggedinType = this.isAdmin ? 'admin_token' : 'user_token'
      await useFetch('/api/logout', {
        query: {
          type: loggedinType,
        },
      })
      this.setUser({})
      router.replace('/')
      return true
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAdminAuthStore, import.meta.hot))
