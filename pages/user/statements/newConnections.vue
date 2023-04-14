<script setup lang="ts">
import { format, parseISO } from 'date-fns'

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
  transform: data => {
    const headerTransform = {
      'contractNumber': 'Պայմանագիր №',
      'Контрагент': 'Անուն Ազգանուն',
      'tariff': 'Տարիֆ',
      'connection_date': 'Միացման ամսաթիվ',
      'price': 'Գումար',
      'balance': 'Հաշվեկշիռ',
      'pay_dt_by_tariff': 'Վճարման օր',
      'last_pay_dt': 'Վերջ․ վճ․ ամսաթիվ',
      'summa': 'Վճարված գումար',
      'status': 'Կարգավիճակ',
      'address': 'Հասցե',
      'phone': 'հեռախոս'
    }
    const body = data.body.map(obj => {
      const newObj: StringIndexedObject = {};

      for (const key in obj) {
        let value: string;

        if (key === 'connection_date') {
          value = format(parseISO(obj[key] as string) as Date, 'yyyy-MM-dd');
        } else {
          value = (obj[key as keyof ConnectionsResponse] + '');
        }

        newObj[headerTransform[key as keyof ConnectionsResponse]] = value;
      }

      return newObj;
    })

    return {
      header: [...Object.values(headerTransform)],
      body: body.map(obj => Object.values(obj))
    }
  }
})

const header = computed(() => {
  const header = connections.value?.header || []
  console.log('header: ', header);
  return header
})

const body = computed(() => connections.value?.body || [])
</script>

<template>
  <div w-full h-full>
    <FTable v-if="connections" :key="2" :src="connections" :rows="body.length || 12" :footer="true" :save="connections">
      <template #save>
        <SaveXlsx :key="Date.now() + ''" :header="header" :body="body" float-right />
      </template>
    </FTable>
  </div>
</template>
