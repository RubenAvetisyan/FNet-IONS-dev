import type { Ref } from '@vue/reactivity'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { $enum } from 'ts-enum-util'
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
    isAdmin: state => state.user.type === 'Admin' && useCookie('admin_token'),
    isUser: state => state.user.type !== 'Admin' && useCookie('user_token'),
    userType: state => state.user.groupId[0], // state.groupId
  },

  actions: {
    setUser(user: any) {
      this.user = {
        ...user,
        description: user.type,
        type: $enum(UserGroupId).getKeyOrDefault(user.groupId[0]),
      }
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
      const router = useRouter()
      $fetch(`/api/logout?type=${this.user.type}`.toLocaleLowerCase())
      this.setUser({})
      router.replace('/')
      return true
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAdminAuthStore, import.meta.hot))
