<script setup>
import { format } from 'date-fns';

const dateFromValue = ref(Date.now())
const dateToValue = ref(Date.now())

const dateFrom = computed({
  get() {
    return format(dateFromValue.value, 'yyyy-MM-dd')
  },
  set(val) {
    console.log('val: ', val);
    dateFromValue.value = val
  }
})
const dateTo = computed({
  get() {
    return format(dateToValue.value, 'yyyy-MM-dd')
  },
  set(val) {
    console.log('val: ', val);
    dateToValue.value = val
  }
})

const { $isLoading, $startLoading, $finishLoading } = useNuxtApp()

const radMap = ref({
  country: false,
  region: false,
  city: false,
  street: false
})

const prevTable = ref('')
const currentTable = ref('country')

const query = ref({
  country: 'Հայաստան'
})

$startLoading()
const { data, refresh, error } = await useFetch('/api/get-totals-abilling', {
  query: {
    data: currentTable.value,
    // dateFrom: dateFromValue.value,
    // dateTo: dateToValue.value,
  }
})
$finishLoading()

const defaultVal = {
  header: ['name', 'ակտիվ', 'պասիվ', 'ընդամենը'],
  body: [
    // {
    //   name: 'some data',
    //   active: 0,
    //   passive: 0,
    //   total: 0
    // }
  ]
}

const brudcoumbs = ref(new Set([{
  text: 'Հայաստան',
}]))

// const table = ref(transform(data.value.country, currentTable.value))
const countrayTable = ref(transform(data.value.country, currentTable))
const regionsTable = ref(transform(data.value.regions, currentTable))
const citiesTable = ref(defaultVal)
const quarterTable = ref(defaultVal)
const streetTable = ref(defaultVal)

const tables = ref({
  country: countrayTable,
  region: regionsTable,
  city: citiesTable,
  quarter: quarterTable,
  street: streetTable
})

const dynamicTable = computed(() => {
  if (currentTable.value === 'region') return regionsTable.value
  if (currentTable.value === 'city') return citiesTable.value
  if (currentTable.value === 'quarter') return quarterTable.value
  if (currentTable.value === 'street') return streetTable.value
  return countrayTable.value
})

function transform(data, curTab) {
  const fn = async (e, header) => {
    console.log('header: ', header);
    prevTable.value = curTab.value + ''
    console.log('prevTable.value: ', prevTable.value);
    curTab.value = header.nextTabKey || 'country'
    brudcoumbs.value.add({
      text: header.text,
      fn: () => curTab.value = header.tabKey
    })
    console.log('curTab.value: ', curTab.value);
    radMap.value[curTab.value] = true
    if (!header.nextTabKey) query.value = {}
    query.value[header.tabKey] = header.text

    if (header.text !== 'Հայաստան') {
      $startLoading()
      const { data: elseData } = await useFetch('/api/get-totals-abilling', {
        query: {
          ...query.value,
          tabKey: header.nextTabKey,
          text: header.text
        },
        pick: ['header', 'body']
      })

      console.log('elseData.value: ', elseData.value);
      elseData.value.body.forEach(item => {
        const bodyFirstKey = elseData.value.header[0]
        item[bodyFirstKey] = { ...item[bodyFirstKey], fn }
      })

      $finishLoading()

      if (currentTable.value === 'region') regionsTable.value = elseData.value
      if (currentTable.value === 'city') citiesTable.value = elseData.value
      if (currentTable.value === 'quarter') quarterTable.value = elseData.value
      if (currentTable.value === 'street') streetTable.value = elseData.value

    }

  }

  if (typeof data.header[0] !== 'string')
    data.header[0] = { ...data.header[0], fn }

  if (typeof data.header[0] === 'string')
    data.body.forEach(body => {
      const bodyFirstKey = data.header[0]
      body[bodyFirstKey] = { ...body[bodyFirstKey], fn }
    })
  return {
    header: [
      data.header[0],
      data.header[1],
      data.header[2],
      data.header[3],
    ],
    body: data.body,
  }
}

</script>


<template>
                                  <div py-4 px-0>
                                    <div relative flex w-full>
                                      <div btn rounded-0 hover:bg-indigo-500 bg-indigo-700 dark:bg-indigo-500 h-8 text-center px-2 flex items-center
                                        text-light dark:text-dark @click="() => currentTable = 'country'">
                                        ՀԱՅԱՍՏԱՆ
                                      </div>
                                      <div btn rounded-0 hover:bg-indigo-500 bg-indigo-700 dark:bg-indigo-500 h-8 text-center px-2 flex items-center
                                        text-light dark:text-dark @click="() => currentTable = 'region'">ՄԱՐԶԵՐ</div>
                                      <nuxt-link to="/user/statements/totalClientPaymens" btn rounded-0 hover:bg-indigo-300 bg-indigo-500
                                        dark:bg-indigo-300 h-8 text-center px-2 flex items-center text-light dark:text-dark>Տեսնել
                                        գումարային</nuxt-link>

                                    </div>
                                    <div flex>

                                      <FTable :key="JSON.stringify(dynamicTable.header)" :footer="true" :src="dynamicTable" transition>
                                        <template #caption>
                                          <div flex>
                                            <DatePicker ml-10 name="date-from" label="սկիզբ" v-model="dateFrom" />
                                            <DatePicker ml-10 name="date-to" label="վերջ" v-model="dateTo" />
                                          </div>
                                        </template>
                                      </FTable>
                                    </div>
  </div>
</template>
