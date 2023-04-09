<script setup>
import { format, isSameDay, parseISO, differenceInDays, subDays } from 'date-fns';

const { data: userInfo } = useAuth()

const rules = {
  '127': 'Երևան',
  '224': 'Երևան',
  '138': 'Երևան',
  '220': 'Արարատի մարզ',
  '227': 'Վայոց Ձորի մարզ',
  '123': 'Գյումրի',
  '265': 'Գյումրի',
  '236': 'Գեղարքունիքի մարզ',
  '54': 'Կոտայքի մարզ',
  '225': 'Կոտայքի մարզ',
}

const admins = [135, 75, 80, 78]

const region = ref(userInfo.value.region)

if (region.value !== rules[userInfo.value.uid] && !admins.includes(+userInfo.value.uid)) {
  await navigateTo('/')
}

const dateFromValue = ref(Date.now())
const dateToValue = ref(Date.now())

const isDisabled = ref(false)
const toggleDisabled = () => isDisabled.value = !isDisabled.value

const dateFrom = computed({
  get() {
    const isDate = typeof dateFromValue.value === 'number' || typeof dateFromValue.value === 'object'
    return '2022-01-01' // isDate ? format(dateFromValue.value, 'yyyy-MM-dd') : dateFromValue.value
  },
  set(val) {
    const value = typeof val === 'string' ? parseISO(val) : val
    if (differenceInDays(value, dateToValue.value) > 0 || differenceInDays(value, Date.now()) > 0) {
      return
    }
    dateFromValue.value = value
  }
})
const dateTo = computed({
  get() {
    const isDate = typeof dateToValue.value === 'number' || typeof dateToValue.value === 'object'
    return isDate ? format(subDays(dateToValue.value, 1), 'yyyy-MM-dd') : dateToValue.value
  },
  set(val) {
    const value = typeof val === 'string' ? parseISO(val) : val
    if (differenceInDays(value, dateFromValue.value) <= 0 || differenceInDays(value, Date.now()) > 0) {
      return
    }
    dateToValue.value = value
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

const query = computed(() => {
  return {
    dateFrom: isSameDay(dateFromValue.value, dateToValue.value) ? '2022-01-01' : dateFrom.value,
    dateTo: dateTo.value,
    country: 'Հայաստան',
    region: region.value
  }
})

const fetchRefresh = ref(null)

const fetch = async (extendQuery = {}) => {

  toggleDisabled()
  $startLoading()
  const q = { ...query.value, ...extendQuery }

  const { data, refresh, error } = await useFetch('/api/get-totals', {
    key: dateFrom.value + dateTo.value,
    query: q
  })

  fetchRefresh.value = refresh
  toggleDisabled()
  $finishLoading()
  return { data, refresh, error }
}
const { data, refresh, error } = await fetch({ tabKey: 'country' })
$finishLoading()

const defaultVal = {
  header: ['name', 'ակտիվ', 'պասիվ', 'Հայաստան'],
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
const regionsTable = ref(defaultVal) // ref(transform(data.value.regions, currentTable))
const citiesTable = ref(defaultVal)
const quarterTable = ref(defaultVal)
const streetTable = ref(defaultVal)

const tables = ['region', 'city', 'quarter', 'street']

const dynamicTable = computed(() => {

  if (currentTable.value === 'region') return regionsTable.value
  if (currentTable.value === 'city') return citiesTable.value
  if (currentTable.value === 'quarter') return quarterTable.value
  if (currentTable.value === 'street') return streetTable.value
  return countrayTable.value
})

function transform(data, curTab) {
  const fn = async (e, header) => {

    prevTable.value = curTab.value + ''
    curTab.value = header.nextTabKey || 'country'
    const isEnd = tables.findIndex(v => v === header.nextTabKey) === tables.length - 1
    brudcoumbs.value.add({
      text: isEnd ? 'Հայաստան' : header.text,
      fn: () => curTab.value = isEnd ? 'country' : header.tabKey
    })

    radMap.value[curTab.value] = true
    if (!header.nextTabKey) query.value = {}
    query.value[header.tabKey] = header.text

    const { data: elseData } = await fetch({
      ...query.value,
      tabKey: header.nextTabKey,
      text: header.text
    })

    if (!elseData?.value[currentTable.value]?.body) return

    elseData?.value[currentTable.value]?.body.forEach(item => {
      const bodyFirstKey = elseData?.value[currentTable.value].header[0]
      item[bodyFirstKey] = { ...item[bodyFirstKey], fn }
    })

    if (currentTable.value === 'region') regionsTable.value = elseData.value[currentTable.value]
    if (currentTable.value === 'city') citiesTable.value = elseData.value[currentTable.value]
    if (currentTable.value === 'quarter') quarterTable.value = elseData.value[currentTable.value]
    if (currentTable.value === 'street') streetTable.value = elseData.value[currentTable.value]
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

const refreshAll = async () => {
  $startLoading()

  try {
    await refreshNuxtData()
  } finally {
    $finishLoading()
  }
}

async function update(newTabKey = '', newText = '', currentTableValue = 'country') {
  currentTable.value = currentTableValue
  const tabKey = newTabKey || dynamicTable.value.header[0].tabKey || dynamicTable.value.body[0][dynamicTable.value.header[0]].tabKey
  const text = newText || dynamicTable.value.header[0].text || dynamicTable.value.body[0][dynamicTable.value.header[0]].text
  const q = query.value
  if (!region.value) {
    delete q.region
    delete q.city
    delete q.quarter
    delete q.street
    regionsTable.value = defaultVal
    citiesTable.value = defaultVal
    quarterTable.value = defaultVal
    streetTable.value = defaultVal
  }
  const { data: elseData } = await fetch({
    ...q,
    dateFrom,
    dateTo,
    country: query.value.country,
    tabKey,
    text
  })

  if (currentTable.value === 'country') countrayTable.value = transform(elseData?.value[currentTable.value], currentTable)
  if (currentTable.value === 'region') regionsTable.value = transform(elseData?.value[currentTable.value], currentTable)
  if (currentTable.value === 'city') citiesTable.value = transform(elseData?.value[currentTable.value], currentTable)
  if (currentTable.value === 'quarter') quarterTable.value = transform(elseData?.value[currentTable.value], currentTable)
  if (currentTable.value === 'street') streetTable.value = transform(elseData?.value[currentTable.value], currentTable)
  refreshNuxtData(dateFrom.value + dateTo.value + 1)
}

const dateRange = computed({
  get() {
    return { dateFrom: dateFrom.value, dateTo: dateTo.value }
  },
  set(value) {
    dateFrom.value = value.dateFrom
    dateTo.value = value.dateTo
  },
})

const { baseUrl } = useRuntimeConfig()

</script>


<template>
        <div py-4 px-0>
          <div relative flex w-full>
            <nuxt-link :href="baseUrl + '/user/statements/totalClients'" btn rounded-0 hover:bg-indigo-500 bg-indigo-700
              dark:bg-indigo-500 h-8 text-center px-2 flex items-center text-light dark:text-dark>
              ՀԱՅԱՍՏԱՆ
            </nuxt-link>
            <div v-if="regionsTable.header[0] !== 'name'" btn rounded-0 hover:bg-indigo-500 bg-indigo-700 dark:bg-indigo-500 h-8
              text-center px-2 flex items-center text-light dark:text-dark @click="() => currentTable = 'region'">ՄԱՐԶԵՐ</div>
            <nuxt-link to="/user/statements/totalClientPaymens" btn rounded-0 hover:bg-indigo-300 bg-indigo-500
              dark:bg-indigo-300 h-8 text-center px-2 flex items-center text-light dark:text-dark>Տեսնել
              գումարային</nuxt-link>

          </div>
          <div flex>

            <FTable :key="currentTable + dateFrom + dateTo" :footer="true" :src="dynamicTable" transition>
              <template #caption>
                <div flex items-end>
                  <!-- <DateFixedRange v-model="dateRange" /> -->
                  <!-- <DatePicker :is-disabled="isDisabled" ml-10 name="date-from" label="սկիզբ" v-model="dateFrom" />
                                                                            <DatePicker :is-disabled="isDisabled" ml-10 name="date-to" label="վերջ" v-model="dateTo" /> -->
                  <div flex h-8 f-btn ml-4 p-2 items-center @click="() => refreshAll()">Թարմացնել տվյալները</div>
                </div>
              </template>
            </FTable>
          </div>
  </div>
</template>