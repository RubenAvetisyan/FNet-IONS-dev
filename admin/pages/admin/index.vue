<script setup lang="ts">
import type { Ref } from 'vue'

definePageMeta({
  requiresAuth: true
})

const { $autoSync, $autoSyncMessage, $isActive } = useNuxtApp()

const autosync = ref()

onMounted(() => autosync.value = $autoSync())

const isActive = computed(() => unref($isActive)) as Ref<boolean>

const message = ref($autoSyncMessage())

const syncButtonFn = (isRunning: boolean) => {
  autosync.value = $autoSync()
  isRunning ? autosync.value.pause() : autosync.value.resume()
}

const getColor = () => unref($isActive) ? 'bg-red-700' : 'bg-purple-700'
const color = ref(getColor())

watch(() => autosync, () => {
  message.value = $autoSyncMessage()
  color.value = getColor()
}, { deep: true, immediate: true })
</script>

<template>
  <div>
    <ClientOnly>
      <div>{{ message }}</div>
      <button class="min-w-14 w-48 rounded-md px-2 py-1  text-light-50 border-hidden hover: hover:border-dotted" :class="[
        color,
      ]" @click="syncButtonFn(autosync.isActive)">
        {{ isActive ? 'STOP' : 'Run' }}
      </button>
    </ClientOnly>
  </div>
</template>
