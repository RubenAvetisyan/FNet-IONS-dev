<script setup>
const { $autoSync: autoSync } = useNuxtApp()
</script>

<template>
  <div>
    Hello from extended page !
    <button @click="() => autoSync(false)">Syncronization</button>
  </div>
</template>