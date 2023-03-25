import { defineStore } from 'pinia'
import { Context } from '@nuxt/types'
import { createPersistedState } from '@pinia/plugin'

interface ComponentWithProps {
  name: string
  identifier: string
  props: Record<string, any>
  children: ComponentWithProps[]
  slots: {
    name: string
    children: ComponentWithProps[]
  }[]
}

export const useComponentStore = defineStore({
  id: 'componentStore',
  state: () => ({
    components: [] as ComponentWithProps[],
  }),
  plugins: [createPersistedState()],
  actions: {
    setComponents(components: ComponentWithProps[]) {
      this.components = components
    },
  },
})

export const componentStorePlugin = ({ store }: Context) => {
  useComponentStore(store)
}
