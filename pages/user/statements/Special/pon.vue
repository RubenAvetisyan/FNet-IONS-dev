<script setup lang="ts">
const { $isLoading, $startLoading, $finishLoading } = useNuxtApp()
$startLoading()
const { data } = await useLazyAsyncData('ipon', async () => $fetch('/api/get-ipon', {
  method: 'POST'
}), {
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

const filters = ref<Record<number, string>>({})

const header = computed(() => {
  return data.value?.header || []
})

const body = computed(() => {
  // return Object.keys(filters.value).length ? data.value?.body || header.value.map(h => []) : []
  return data.value?.body || []
})

watch(() => filters.value, value => {
  console.log('value: ', value);

})
</script>

<template>
    <div h-screen>
      <FTable :src="{ header, body }" :rows="100" :footer="true">
        <template #save>
          <SaveXlsx :header="header" :body="body" float-right />
        </template>
      </FTable>

      <!-- <c-table-main :headers="header" :body="body.slice(0, 100)" name="PON" :exactSearch="['IP']" :searchFromFiltered="{ AIM: true }"
          v-model="filters">
          <template #head="{ headers }">
        <lazy-c-table-header-td v-for="(header, i) in headers" :key="header || i">
          {{ header }}
        </lazy-c-table-header-td>
      </template>
        <div>Ruben</div>
        <template #footer>
          <span>
            Footer
          </span>
        </template>
      </c-table-main> -->

  </div>
</template>
