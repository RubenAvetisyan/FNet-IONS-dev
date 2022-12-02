import { acceptHMRUpdate, defineStore } from 'pinia'

export const usedrawerStore = defineStore('drawer', {
    state: () => ({
        width: 86,
        mini: false
    }),

    getters: {
        getWidth: state => `w-${state.width}`,
        isminified: (state): boolean => state.mini
    },

    actions: {
        minify(isMinified: boolean) {
            this.mini = !isMinified
            this.setWidth()
            return this.isminified
        },
        setWidth() {
            this.width = this.mini ? 14 : 86
        }
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(usedrawerStore, import.meta.hot))