<script setup>
const route = useRoute()
const logs = useLogStore()
const name = route.params.row

// const counter = ref(0)

const { data: log, refresh } = await useAsyncData(route.params.row, () => $fetch('/api/log', {
  keepalive: true,
  mode: 'cors',
  parseResponse: JSON.parse,
  headers: {
    'Content-type': 'application/octet-stream',
  },
}), {
  watch: [route.params.row],
})

watchEffect(() => {
  logs.setNewLog(log.value?.status || '')
})

// console.log('savedLog: ', logs.savedLog)

// const { pause, resume, isActive } = useIntervalFn(async () => {
//   counter.value++
//   await refresh()
//   console.log('counter.value: ', counter.value, log.value);
// }, 2000)
</script>

<template>
  <div>
    <p>{{ name }}</p>
    <pre>{{ JSON.parse(logs.savedLog)}}</pre>
  </div>
</template>
