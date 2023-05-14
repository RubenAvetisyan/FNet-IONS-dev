<script setup lang="ts">
import { format } from 'date-fns'
import { hy } from 'date-fns/locale'
import { json } from 'stream/consumers';
const { data: user } = useAuth()

console.log('includes(user.value.uid): ', !['224'].includes(user.value?.uid));
if (!user.value.isAdmin && !['224'].includes(user.value?.uid)) {
  navigateTo({
    path: '/protected'
  })
}
type StringIndexedObject = {
  [key: string]: string;
};

type ConnectionsResponse = {
  contractNumber: string;
  Контрагент: string;
  tariff: string;
  connection_date: Date;
  price: string;
  balance: number;
  pay_dt_by_tariff: string;
  last_pay_dt: string;
  summa: number;
  status: string;
  address: string;
}

const { $startLoading, $finishLoading } = useNuxtApp()

const date = ref(Date.now())
const query = computed(() => {
  return typeof date.value !== 'string' ? format(date.value, 'yyyy-MM', { locale: hy }) : date.value
})
const { data, refresh, pending } = await useAsyncData(query.value, () => $fetch('/api/get-new-Connections/?date=' + query.value))

const connections = ref(data.value)
const header = computed(() => {
  const header = [...new Set(connections.value?.body.map(b => Object.keys(b)).flat())]
  return header
})

const body = computed(() => connections.value?.body || [])

watch(() => query.value, (n, o) => {
  if (o && o !== n) {
    connections.value = { header: [], body: [] }
    refresh()
  }
})

watch(() => data.value, (n: any, o: any) => {
  if (!o && JSON.stringify(o) === JSON.stringify(n)) return

  connections.value = n
})

watch(() => pending.value, (n, o) => {
  if (n) {
    $startLoading()
  } else {
    $finishLoading()
  }
})
</script>

<template>
  <div w-full h-full>
      <FTable v-if="connections" :key="query" :src="{
          header,
          body
        }" :rows="body.length || 12" :footer="true" :save="connections">
        <template #caption>
          <DatePicker v-model="date" label="ընթացիկ ամիս" name="monthOfStatement" dateType="month" />
        </template>
      <template #save>
        <SaveXlsx :key="Date.now() + ''" :header="header" :body="body" float-right />
      </template>
    </FTable>
  </div>
</template>
