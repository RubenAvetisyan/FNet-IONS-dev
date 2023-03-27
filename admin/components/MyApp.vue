<script setup>
const { components } = useAddComponent()
</script>

<template>
  <div>
    <button @click="addComponent">Add Component</button>
    <div v-for="component in components" :key="component.identifier">
      <component :is="component.name" :props="component.props">
        <div v-for="(child, index) in component.children" :key="index">
          <component :is="child.name" :props="child.props">
            <div v-for="(slot, index) in child.children" :key="index" :slot="slot.name">
              <component v-for="(slotChild, index) in slot.children" :key="index" :is="slotChild.name"
                :props="slotChild.props" />
            </div>
          </component>
        </div>
        <template v-for="slot in component.slots">
          <template v-for="(slotChild, index) in slot.children" :key="index" :slot="slot.name">
            <component :is="slotChild.name" :props="slotChild.props" />
          </template>
        </template>
      </component>
    </div>
  </div>
</template>
