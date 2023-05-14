<script setup>
import { format, isSameDay, parseISO, differenceInDays, subDays } from 'date-fns';
const route = useRoute()
const router = useRouter()
const basePath = '/user/statements/totalClientPayments'
const { data: userInfo, status } = useAuth()
const isAdmin = computed(() => userInfo.value.isAdmin)

const region = ref(isAdmin.value ? '' : userInfo?.value.region)

if (status.value === 'authenticated' && !userInfo?.value.isUser && !isAdmin.value) {
  await navigateTo({
    path: '/user/statement/',
    replace: true
  })
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

const fetch = async (extendQuery = {}) => {

  toggleDisabled()
  $startLoading()
  const q = { ...query.value, ...extendQuery }

  const { data, refresh, error } = await useFetch('/api/get-totals', {
    key: dateFrom.value + dateTo.value,
    query: q,
  })

  toggleDisabled()
  $finishLoading()
  return { data, refresh, error }
}
const { data, refresh, error } = await fetch({ tabKey: 'country' })

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

const filters = ref({
  contractNumbers: '',
  city: '',
  quarter: '',
  street: ''
})

const updateDetails = ref('')
const { data: details, pending } = await useLazyAsyncData('details', () => $fetch('/api/get-passive_detailed', {
  method: 'POST',
  body: {
    filters: updateDetails.value
  }
}), {
  server: true,
  watch: [updateDetails]
})

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

const detailedTable = ref(defaultVal)
const detailedTableTitle = ref('')
const showDynamicTable = ref(true)

function transform(data, curTab) {
  const fn = async (e, header) => {

    prevTable.value = curTab.value + ''
    curTab.value = header.nextTabKey || 'country'
    const isEnd = tables.findIndex(v => v === header.nextTabKey) === tables.length - 1

    if (curTab.value === 'city') filters.value.city = header.text
    if (curTab.value === 'quarter') filters.value.quarter = header.text
    if (curTab.value === 'street') filters.value.street = header.text

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

      if (Object.keys(filters.value).includes(currentTable.value))
        item.passive = {
          text: item.passive,
          tabKey: item[bodyFirstKey].tabKey,
          fn: () => {
            filters.value[currentTable.value] = item[bodyFirstKey].text
            updateDetails.value = [{
              target: 'contractNumbers',
              value: elseData?.value[currentTable.value].passiveCustomerNumbers[item[bodyFirstKey].text].replace(/,\s*$/, "")
            }]
            //   Object.entries(filters.value).map(([k, value]) => {
            //   return { target: k, value }
            // })
            detailedTableTitle.value = `Պասիվ հաճախորդների ցանկ. (${item[bodyFirstKey].text})}`
            showDynamicTable.value = false
          }
        }
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

const dateRange = computed({
  get() {
    return { dateFrom: dateFrom.value, dateTo: dateTo.value }
  },
  set(value) {
    dateFrom.value = value.dateFrom
    dateTo.value = value.dateTo
  },
})


const xlsxHeader = computed(() => {
  return dynamicTable.value.header.map((header, i) => {
    return [0, 2].includes(i) ? header?.text || header : ''
  }).filter(s => s)
})

const xlsxBody = computed(() => {
  return dynamicTable.value.body.map((item) => {
    const result = []
    Object.values(item).forEach((v, i) => {
      const itemValue = v?.text || v

      if ([0, 2].includes(i)) {
        result.push(itemValue)
      }

    })
    return result // zipobject(props.src.header, item)
  })
})

const { baseUrl } = useRuntimeConfig()
watch(() => pending.value, p => {
  if (p) {
    $startLoading()
  } else {
    $finishLoading()
  }
}, {
  immediate: true
})

watch(() => details.value, (n) => {
  if (n) detailedTable.value = {
    header: ['Պայմանագիր №', 'Անուն/ Ազգանուն', 'Տարիֆ', 'Վճար', 'Հաշվեկշիռ', 'Վճարման օր', 'Վերջ. վճար. օր', 'Կարգավիճակ', 'Հասցե', 'Հեռախոս'],
    body: n.body
  }
}, {
  immediate: true,
  deep: true
})

</script>


<template>
    <div w-full h-full>
      <div relative flex w-full>
        <nuxt-link to="https://ions.fnet.am/user/statements/totalClients" btn rounded-0 hover:bg-indigo-500 bg-indigo-700
          dark:bg-indigo-500 h-8 text-center px-2 flex items-center text-light dark:text-dark>
          ՀԱՅԱՍՏԱՆ
        </nuxt-link>
        <div v-if="regionsTable.header[0] !== 'name'" btn rounded-0 hover:bg-indigo-500 bg-indigo-700 dark:bg-indigo-500 h-8
          text-center px-2 flex items-center text-light dark:text-dark @click="() => currentTable = 'region'">ՄԱՐԶԵՐ</div>
        <nuxt-link to="/user/statements/totalClientPayments" btn rounded-0 hover:bg-indigo-300 bg-indigo-500
          dark:bg-indigo-300 h-8 text-center px-2 flex items-center text-light dark:text-dark>Տեսնել
          գումարային</nuxt-link>

      </div>
      <div v-show="showDynamicTable" flex w-3xl h-full lg:h-4xl>
        <FTable :key="currentTable + dateFrom + dateTo" :footer="true" :src="dynamicTable" :rows="dynamicTable.body.length"
          transition w-prose max-w-700>
          <template #caption>
            <div flex items-end>
              <!-- <DateFixedRange v-model="dateRange" /> -->
              <!-- <DatePicker :is-disabled="isDisabled" ml-10 name="date-from" label="սկիզբ" v-model="dateFrom" />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              <DatePicker :is-disabled="isDisabled" ml-10 name="date-to" label="վերջ" v-model="dateTo" /> -->
              <div flex h-8 f-btn ml-4 p-2 items-center @click="() => refreshAll()">Թարմացնել տվյալները</div>
            </div>
          </template>
          <template #save>
            <SaveXlsx :key="currentTable + dateFrom + dateTo" :header="xlsxHeader" :body="xlsxBody" float-right />
          </template>
        </FTable>
      </div>
      <div w-full lg:h-4xl>
        <FTable :key="JSON.stringify(detailedTable.value)" :name="detailedTableTitle" :src="detailedTable || defaultVal"
          :footer="true" :rows="detailedTable.body.length">

          <template #caption>
            <div v-show="!showDynamicTable" float-right f-btn @click="() => showDynamicTable = !showDynamicTable">
              Վերադառնալ հիմանական ցանկ</div>
          </template>

          <template #save>
            <SaveXlsx :key="currentTable + dateFrom + dateTo" :header="detailedTable.header"
              :body="detailedTable.body.map(b => Object.values(b))" float-right />
          </template>
        </FTable>
      </div>
  </div>
</template>
