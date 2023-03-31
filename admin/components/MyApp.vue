<script setup>
import { useAddComponent } from '@/composables/useAddComponent'

const { components, addNewComponent, removeComponent } = useAddComponent()

const componentName = ref('')
const componentProps = ref('')
const componentSlots = ref('')

function onSubmit() {
  import(`../../components/${componentName.value}.vue`).then(component => {
    if (!component) return
    console.log(component.default?.name); // имя экспорта компонента
    console.log(component.default?.__file); // путь файла компонента

    const props = componentProps.value ? JSON.parse(componentProps.value) : {}
    const slots = componentSlots.value ? JSON.parse(componentSlots.value) : []
    addNewComponent(componentName.value)
    componentName.value = ''
    componentProps.value = ''
    componentSlots.value = ''
  })
}
</script>

<template>
  <div>
      <h2>Добавить новый компонент</h2>
      <form mb-4 @submit.prevent="onSubmit">
        <div mb-2>
          <label font-medium for="componentName">Название компонента:</label>
          <input type="text" id="componentName" v-model="componentName" required border b-1>
        </div>
        <div mb-2>
          <label font-medium for="componentProps">Свойства компонента:</label>
          <textarea id="componentProps" v-model="componentProps" border b-1></textarea>
        </div>
        <div mb-2>
          <label font-medium for="componentSlots">Слоты компонента:</label>
          <textarea id="componentSlots" v-model="componentSlots" border b-1></textarea>
        </div>
        <button btn type="submit">Добавить</button>
      </form>

      <h2>Добавленные компоненты</h2>
      <ul>
        <li v-for="(component, index) in components" :key="index">
          {{ component.name }}
          <button @click="removeComponent(index)">Удалить</button>
        </li>
      </ul>
  </div>
</template>
