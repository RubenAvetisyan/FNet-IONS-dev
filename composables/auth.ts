import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAuthStore = defineStore('user', () => {
    /**
     * Current named of the user.
     */
    const state = ref(false)
    const user = ref(new Map<string, any>())

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

        if (type === 'login') {
            state.value = false
            user.value.delete(name)
        }
    }

    return {
        setAuth,
        isUserLogedin,
        state,
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
