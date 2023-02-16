<script setup>
import { storeToRefs } from 'pinia'
const { isAlert, alertMsg } = storeToRefs(useAlertStore())

const msgs = computed(() => {
  return alertMsg.value.split('.')
})
</script>

<template>
  <main fixed top="0" left="0" right="0" bottom="0" flex text-center h-screen bg="slate-50 dark:slate-900">
    <AdminDrawer class="top-0 left-0" />

    <div v-if="isAlert" class="fixed w-1/3 left-0 right-0 px-10 top-2 z-100 mx-auto">
      <alert v-if="isAlert" class="flex items-center mx-auto">
        <span class="font-medium">{{ msgs[0] }}.</span>
        {{ msgs[1] || '' }}
      </alert>
    </div>
    <div class="grow place-content-center">
      <!-- <Alerter /> -->

      <div flex h-screen mx-auto relative place-content-center>
        <slot />
      </div>
    </div>
  </main>
</template>
