<script setup lang="ts">
import { format, parseISO } from 'date-fns'
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

const { data: connections } = await useFetch('/api/get-new-Connections', {
  pick: ['header', 'body'],
})

const header = computed(() => {
  const header = [...new Set(connections.value?.body.map(b => Object.keys(b)).flat())]
  return header
})

const body = computed(() => connections.value?.body || [])
</script>

<template>
  <div w-full h-full>
        <FTable v-if="connections" :key="2" :src="{
            header,
            body
          }" :rows="body.length || 12" :footer="true" :save="connections">
      <template #save>
        <SaveXlsx :key="Date.now() + ''" :header="header" :body="body" float-right />
      </template>
    </FTable>
  </div>
</template>
