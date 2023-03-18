import { acceptHMRUpdate, defineStore } from 'pinia'

export const useDrawerStore = defineStore('drawer', {
  state: () => ({
    width: 86,
    mini: false,
  }),

  getters: {
    getWidth: state => state.width,
    isminified: (state): boolean => state.mini,
  },

  actions: {
    minify() {
      this.mini = !this.mini
      this.setWidth()
      return this.isminified
    },
    setWidth() {
      this.width = this.mini ? 14 : 86
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useDrawerStore, import.meta.hot))
