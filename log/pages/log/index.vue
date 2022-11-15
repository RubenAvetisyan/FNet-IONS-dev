<script setup>
const logs = useLogStore()

const log = ref('')
const result = computed(() => {
  return log.value
})
const data = ref()

if (!logs.savedLog) {
  const { data: d } = await useFetch(() => '/api/log')
  data.value = d.value
  log.value = unref(data)
}

watch(() => data, (newLog, oldLog) => {
  if (unref(oldLog) === unref(newLog))
    return

  logs.setNewLog(unref(newLog))
}, {
  immediate: true,
  deep: true,
})
const key = ref(0)
watch(() => logs.savedLog, (newLog, oldLog) => {
  if (oldLog === newLog)
    return
  log.value = unref(newLog)
  console.log('index log: ', log.value)
  key.value++
})
</script>

<template>
  <div>
    <pre>{{ JSON.parse(result) }}</pre>
    <ClientOnly>
      <TextArea :key="key" :text="result" class="h-full" />
    </ClientOnly>
  </div>
</template>
