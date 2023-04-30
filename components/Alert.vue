<script setup lang="ts">
const { alertMsg, color, icon, alertType } = useAlertStore()
console.log('msg, color, icon, type: ', alertMsg, color, icon, alertType);
</script>

<template>
    <div v-for="msg in alertMsg" :key="msg" flex p-4 mb-4 text-sm rounded-lg bg-gray-3 dark:bg-gray-1 :class="[color]" role="alert">
      <div :class="icon" pl-2><span class="sr-only">{{ alertType }}: </span>
        <span> {{ msg }} </span>
    </div>
  </div>
</template>
