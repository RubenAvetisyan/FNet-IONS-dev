import type { Ref } from '@vue/reactivity'
import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
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

// const appConfig = useAppConfig()
// console.log('appConfig: ', appConfig);

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
    isAdmin: state => Array.isArray(state.user.groupId) ? state.user.groupId[0] === UserGroupId.Admin : false,
    isUser: () => {
      return useCookie('user_token').value?.length
    },
    userType: state => state.user.type, // state.groupId
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

      console.log('login user: ', data.value);
      const user = data.value as User

      if (!data.value || !user.groupId.includes(UserGroupId.Admin)) {
        return setAlert ? setAlert('Սխալ տվյալներ', 'warning') : true
      }

      const router = useRouter()

      if (setAlert)
        setAlert('Դուք հաջողությամբ նույնականացվեցիք․․․', 'success')

      this.user = {
        ...user,
        description: user.type,
        type: $enum(UserGroupId).getKeyOrDefault(user?.groupId[0]),
      }

      if (this.isAdmin) {
        router.replace('/admin')
      } else {
        router.replace('/operations')
      }
    },
    logout() {
      console.log('logout...');
      const router = useRouter()
      const loggedinType = this.isAdmin ? 'admin_token' : 'user_token'
      useFetch(`/api/logout?type=${loggedinType}`.toLocaleLowerCase())
      this.setUser({})
      router.replace('/')
      return true
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAdminAuthStore, import.meta.hot))
