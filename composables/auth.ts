import { SessionData } from '@sidebase/nuxt-auth/dist/runtime/composables/useAuthState'
import { acceptHMRUpdate, defineStore } from 'pinia'

export type RuleKey = "127" | "224" | "138" | "220" | "227" | "123" | "265" | "236" | "54" | "225"
const deafultRuels = {
  '127': 'Երևան',
  '224': 'Երևան',
  '138': 'Երևան',
  '220': 'Արարատի մարզ',
  '227': 'Վայոց Ձորի մարզ',
  '123': 'Գյումրի',
  '265': 'Գյումրի',
  '236': 'Գեղարքունիքի մարզ',
  '54': 'Կոտայքի մարզ',
  '225': 'Կոտայքի մարզ',
}

export const useAuthStore = defineStore('user', () => {
  const { data } = useAuth()
  const userInfo = data.value as SessionData & { uid: string; region: string }

  /**
     * Current named of the user.
     */
  const state = ref(false)
  const user = ref(new Map<string, any>())
  const rules = ref<Record<RuleKey, string>>(deafultRuels)

  user.value.set('name', userInfo.user?.name)
  user.value.set('id', userInfo.uid)
  user.value.set('region', userInfo.region)

  const isUserLogedin = computed(() => state.value)
  // const otherNames = computed(() => usedNames.value.filter(name => name !== savedName.value))

  /**
     * Changes the current name of the user and saves the one that was used
     * before.
     *
     * @param name - new name to set
     */
  function setAuth(type: 'login' | 'logout', name: string, options = {}) {
    // if (state.value)
    //     previousNames.value.add(savedName.value)

    if (type === 'login') {
      state.value = true
      user.value.set(name, options)
    }

    if (type === 'logout') {
      state.value = false
      user.value.delete(name)
    }
  }

  function getUser(param: string) {
    return param ? user.value.get(param) : user.value
  }

  return {
    setAuth,
    isUserLogedin,
    state,
    rules,
    getUser
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
