import { ref, onMounted, onUnmounted } from 'vue'
import { useComponentStore } from '../store/index'

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

export function useAddComponent() {
  const components = ref<ComponentWithProps[]>([])
  const componentStore = useComponentStore()

  onMounted(() => {
    components.value = componentStore.components
  })

  onUnmounted(() => {
    componentStore.components = components.value
  })

  function addNewComponent(component: ComponentWithProps, identifier?: string) {
    if (identifier) {
      const existingComponent = components.value.find((c) => c.identifier === identifier)
      if (existingComponent) {
        Object.assign(existingComponent, component)
      } else {
        components.value.push({
          ...component,
          identifier,
        })
      }
    } else {
      components.value.push(component)
    }
  }

  function removeComponent(identifier: string) {
    const index = components.value.findIndex((component) => component.identifier === identifier)
    if (index !== -1) {
      components.value.splice(index, 1)
    }
  }

  return {
    components,
    addNewComponent,
    removeComponent,
  }
}
