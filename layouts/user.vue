<script setup>
import { storeToRefs } from 'pinia'
const { isAlert, alertMsg } = storeToRefs(useAlertStore())
const { $isLoading } = useNuxtApp()
const isLoading = computed(() => $isLoading.value)
const msgs = computed(() => {
  return alertMsg.split('.')
})

</script>

<template>
  <main fixed top-0 left-0 right-0 bottom-0 flex text-center h-screen>
      <Loading v-show="isLoading" />
    <AdminDrawer top-0 left-0 />

    <div grow>
        <!-- <Alerter /> -->

        <div h-screen mx-auto relative>
        <slot />
      </div>
    </div>
  </main>
</template>
