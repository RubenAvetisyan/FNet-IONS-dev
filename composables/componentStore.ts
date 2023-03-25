import { useStore } from '../store/index'

export default {
  setup() {
    const componentStore = useStore()

    function addComponent(component: ComponentWithProps) {
      componentStore.addComponent(component)
    }

    function removeComponent(identifier: string) {
      componentStore.removeComponent(identifier)
    }

    return {
      addComponent,
      removeComponent,
    }
  },
}
