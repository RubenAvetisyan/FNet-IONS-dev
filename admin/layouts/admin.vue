<script setup>
import { storeToRefs } from 'pinia'
const { isAlert, alertMsg } = storeToRefs(useAlertStore())

const msgs = computed(() => {
  return alertMsg.value.split('.')
})
</script>

<template>
  <main class="flex py-0 pr-10 text-center h-screen">
    <Drawer class="top-0 left-0 " />

    <div class="grow">
      <!-- <Header /> -->
      <navbar fixed top-0 mx-auto w-full justify-space-between>
        <template #extras>
          <LoginButton />
        </template>
      </navbar>

      <div class="fixed w-1/3 left-0 right-0 px-10 top-0 z-100 mx-auto">
        <alert v-if="isAlert" class="flex items-center mx-auto">
          <span class="font-medium">{{ msgs[0] }}.</span>
          {{ msgs[1] || '' }}
        </alert>
      </div>
      <div container h-full mx-auto mb-1>
        {{ isAlert }}
        <slot />
      </div>
      <div class="mt-5 mx-auto text-center opacity-25 text-sm">
        <FooterM mt-1 />
      </div>
    </div>
  </main>
</template>
