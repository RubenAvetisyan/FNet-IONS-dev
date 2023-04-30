<script setup lang="ts">
const { $isLoading, $startLoading, $finishLoading } = useNuxtApp()
$startLoading()
const { data } = await useLazyAsyncData('ipon', () => $fetch('/api/get-ipon'), {
  transform: data => {
    const header = ['ip', 'pon', 'AIM', 'serial', 'Պայմանա\nգիր №', 'Հասցե', 'Հեռ․']
    const body = data.body.map((b, i) => ([
      b['ip'],
      b['PON'],
      b['AIM'],
      b['serial'],
      b['Պայմանագիր №'],
      b['Հասցե'],
      b['phone']
    ]))
    return {
      header,
      body
    }
  }
})

const mainTable = ref<typeof data.value>({
  header: [],
  body: []
})

mainTable.value = data.value

onMounted(async () => {
  if (mainTable.value?.body.length)
    $finishLoading()
})

const body = computed(() => {
  return mainTable.value?.body || []
})

const rows = computed(() => {
  const mainTableRows = mainTable.value?.body.length || 0
  return 21
})

const { list, containerProps, wrapperProps } = useVirtualList(unref(body), {
  itemHeight: 80,
  overscan: 5
})

// watch(() => data.value, (n) => {
//   console.log('n: ', n);
//   if (n) {
//     mainTable.value = n
//   }
// })
</script>

<template>
  <div h-screen>
    <!-- <FTable v-if="rows && mainTable" :src="mainTable" :rows="mainTable.body.length" :footer="true">
      <template #save>
        <SaveXlsx :header="mainTable.header" :body="mainTable.body" float-right />
      </template>
    </FTable> -->

    <lazy-c-table-main v-if="mainTable?.body" :header="mainTable.header" :body="mainTable.body" name="">
      <template #head="{ headers }">
        <lazy-c-table-headerTd v-for="(header, i) in headers" :key="header || i">
          {{ header }}
        </lazy-c-table-headerTd>
      </template>
      <div>Ruben</div>
      <template #footer>
        <span>
          Footer
        </span>
      </template>
    </lazy-c-table-main>

  </div>
</template>
