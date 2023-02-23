<script setup>
import { storeToRefs } from 'pinia'
const { isAlert, alertMsg } = storeToRefs(useAlertStore())
const { $isLoading } = useNuxtApp()
const isLoading = ref()
const msgs = computed(() => {
  return alertMsg.value.split('.')
})

watch(() => useNuxtApp().$isLoading.value, (loading) => {
  isLoading.value = loading
}, {
  deep: true,
  immediate: true
})
</script>

<template>
    <main fixed top="0" left="0" right="0" bottom="0" flex text-center h-screen bg="slate-50 dark:slate-900" relative>
      <Loading v-show="isLoading" />
      <AdminDrawer class="top-0 left-0" />
      <!-- <AdminNewDrawer /> -->
        <div v-if="isAlert" class="fixed w-1/3 left-0 right-0 px-10 top-2 z-100 mx-auto">
          <alert v-if="isAlert" class="flex items-center mx-auto">
            <span class="font-medium">{{ msgs[0] }}.</span>
            {{ msgs[1] || '' }}
          </alert>
        </div>
        <div class="grow place-content-center">
          <!-- <Alerter /> -->
          <!-- drawer init and show -->
          <!-- <div class="text-center">
            <button
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              type="button" data-drawer-target="drawer-navigation" data-drawer-show="drawer-navigation"
              aria-controls="drawer-navigation">
              Show navigation
            </button>
          </div> -->
      <div flex h-screen mx-auto relative place-content-center>
        <slot />
      </div>
    </div>
  </main>
</template>
