<script setup>
import { storeToRefs } from 'pinia'
const { isAlert, alertMsg } = storeToRefs(useAlertStore())
const { $isLoading } = useNuxtApp()
const isLoading = computed(() => $isLoading.value)
const msgs = computed(() => {
  return alertMsg.value.split('.')
})

</script>

<template>
  <main fixed top-0 left-0 right-0 bottom-0 flex text-center h-screen>
      <Loading v-show="isLoading" />
    <AdminDrawer top-0 left-0 />

    <div grow>
      <!-- <Alerter /> -->
      <div v-if="isAlert" fixed w="1/3" left-0 right-0 px-10 top-2 z-100 mx-auto>
        <alert v-if="isAlert" flex items-center mx-auto>
          <span font-medium>{{ msgs[0] }}.</span>
          {{ msgs[1] || '' }}
        </alert>
      </div>

      <div h-screen mx-auto pb-28 relative>
        <slot />
      </div>
    </div>
  </main>
</template>
