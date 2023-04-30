<script setup>
import { startOfMonth } from 'date-fns';
const route = useRoute()
console.log('route query: ', route.query);
const router = useRouter()
const basePath = '/user/statements/totalClientPayments'
const { data: userInfo, status } = useAuth()
const isAdmin = computed(() => userInfo.value.isAdmin)

const region = ref(isAdmin.value ? '' : userInfo?.value.region)

// if (status.value === 'authenticated' && !userInfo?.value.isUser && !isAdmin.value) {
//   await navigateTo('/user/statement/')
// }

const { dateFrom, dateTo } = useDate()
dateFrom.value = route.query.dateFrom || startOfMonth(Date.now())

const isDisabled = ref(false)
const toggleDisabled = () => isDisabled.value = !isDisabled.value

const { $isLoading, $startLoading, $finishLoading } = useNuxtApp()

const prevTable = ref('')
const currentTable = ref(isAdmin.value ? 'country' : 'region')

const query = computed(() => {
  return {
    dateFrom: dateFrom.value,
    dateTo: dateTo.value,
    country: 'Հայաստան',
    ...route.query,
    ...(region.value && { region: region.value }),
    ...(region.value && { tabKey: 'region' }),
  }
})

const fetch = async (extendQuery = {}) => {
  toggleDisabled()
  $startLoading()
  const q = { ...query.value, ...extendQuery }
  console.log('q: ', q);
  const { data, refresh, error } = await useFetch('/api/get-payments-totals', {
    key: q.dateFrom + q.dateTo,
    query: q
  })

  toggleDisabled()
  $finishLoading()
  return { data, refresh, error }
}

const defaultVal = {
  header: ['', 'ակտիվ', 'պասիվ', 'ընդամենը'],
  body: [
  ]
}

const countrayTable = ref(defaultVal)
const regionsTable = ref(defaultVal)
const citiesTable = ref(defaultVal)
const quarterTable = ref(defaultVal)
const streetTable = ref(defaultVal)

const { data } = await fetch({ tabKey: isAdmin.value ? 'country' : 'region' })
onMounted(async () => {
  nextTick(() => {
    isAdmin.value
      ? countrayTable.value = transform(data.value?.country, currentTable)
      : regionsTable.value = transform(data.value?.region, currentTable)
  })
})

const dynamicTable = computed(() => {
  console.log('currentTable.value: ', currentTable.value);
  if (currentTable.value === 'country') return countrayTable.value
  if (currentTable.value === 'region') return regionsTable.value
  if (currentTable.value === 'city') return citiesTable.value
  if (currentTable.value === 'quarter') return quarterTable.value
  if (currentTable.value === 'street') return streetTable.value
  return countrayTable.value
})

const fn = (curTab) => async (e, header) => {
  if (header.tabKey === 'street') return restart()

  prevTable.value = curTab.value + ''
  curTab.value = typeof header === 'string' ? header : header.nextTabKey || 'country'

  console.log('curTab.value: ', curTab.value);
  if (!header.nextTabKey) query.value = {}
  query.value[header.tabKey] = header.text

  router.replace({
    path: basePath,
    query: {
      ...query.value,
      tabKey: header.nextTabKey,
      text: header.text
    }
  })
}

function transform(data, curTab) {
  if (!data) return
  if (typeof data?.header[0] !== 'string')
    data.header[0] = { ...data.header[0], fn: fn(curTab) }

  if (typeof data?.header[0] === 'string')
    data?.body.forEach(body => {
      const bodyFirstKey = data.header[0]
      body[bodyFirstKey] = { ...body[bodyFirstKey], fn: fn(curTab) }
    })
  return {
    header: [
      data?.header[0],
      data?.header[1],
      data?.header[2],
      data?.header[3],
    ],
    body: data?.body,
  }
}

async function restart() {
  navigateTo({
    path: basePath,
    replace: true,
    query: {
      dateFrom: dateFrom.value,
      dateTo: dateTo.value,
    }
  }, {
    external: true
  })
}

const refreshAll = async () => {
  $startLoading()
  console.log('query.value: ', query.value);
  navigateTo({
    path: basePath,
    replace: true,
    query: {
      tabKey: currentTable.value,
      dateFrom: dateFrom.value,
      dateTo: dateTo.value,
    }
  })
  $finishLoading()
  // try {
  //   await refreshNuxtData(currentTable.value)
  // } finally {
  //   $finishLoading()
  // }
}

const xlsxHeader = computed(() => {
  return dynamicTable.value?.header.map((header, i) => {
    return [0, 1, 2].includes(i) ? header?.text || header : ''
  }).filter(s => s)
})

const xlsxBody = computed(() => {
  return dynamicTable.value?.body.map((item) => {
    const result = []
    Object.values(item).forEach((v, i) => {
      const itemValue = v?.text || v

      if ([0, 1, 2].includes(i)) {
        result.push(itemValue)
      }

    })
    return result // zipobject(props.src.header, item)
  })
})

watch(() => route.query, async (n, o) => {
  if (!n || JSON.stringify(n) === JSON.stringify(o) || !o) return

  toggleDisabled()
  const { data: elseData } = await fetch({
    ...query.value,
    ...n
  })

  console.log('elseData.value: ', elseData.value);
  elseData.value[currentTable.value]?.body.forEach(item => {
    const bodyFirstKey = elseData?.value[currentTable.value]?.header[0]
    item[bodyFirstKey] = {
      ...item[bodyFirstKey],
      fn: fn(currentTable)
    }
  })

  if (currentTable.value === 'country') countrayTable.value = elseData.value[currentTable.value]
  if (currentTable.value === 'region') regionsTable.value = elseData.value[currentTable.value]
  if (currentTable.value === 'city') citiesTable.value = elseData.value[currentTable.value]
  if (currentTable.value === 'quarter') quarterTable.value = elseData.value[currentTable.value]
  if (currentTable.value === 'street') streetTable.value = elseData.value[currentTable.value]
  toggleDisabled()
}, {

  immediate: true
})
</script>


<template>
                  <div px-0 overflow-y-auto>
                    <div relative flex w-full>
                      <div v-if="isAdmin" btn rounded-0 hover:bg-indigo-500 bg-indigo-700 dark:bg-indigo-500 h-8 text-center px-2 flex
                        items-center text-light dark:text-dark @click="restart">
                        ՀԱՅԱՍՏԱՆ
                      </div>
                      <div v-if="regionsTable?.header[0] !== 'name'" btn rounded-0 hover:bg-indigo-500 bg-indigo-700 dark:bg-indigo-500
                        h-8 text-center px-2 flex items-center text-light dark:text-dark @click="() => currentTable = 'region'">ՄԱՐԶԵՐ
                      </div>
                      <nuxt-link to="/user/statements/totalClients" btn rounded-0 hover:bg-indigo-300 bg-indigo-500 dark:bg-indigo-300 h-8
                        text-center px-2 flex items-center text-light dark:text-dark>Տեսնել
                        քանակային</nuxt-link>

                    </div>
                    <div flex w-3xl h-full lg:h-4xl>
                      <FTable v-show="!$isLoading.value" :disabled="isDisabled" :key="currentTable + route.hash" :footer="true"
                        :src="dynamicTable || defaultVal" :rows="dynamicTable?.body.length || 0" transition>
                        <template #caption>
                          <div flex w-full items-end border b-0 b-b-1 mb-1 pb-1 px-0 mx-auto>
                            <DatePicker :is-disabled="isDisabled" ml-10 name="date-from" label="սկիզբ" v-model="dateFrom" />
                            <DatePicker :is-disabled="isDisabled" ml-10 name="date-to" label="վերջ" v-model="dateTo" />
                            <div :disabled="isDisabled" flex h-8 f-btn ml-4 p-2 items-center @click="refreshAll">Թարմացնել տվյալները</div>
                          </div>
                        </template>
                        <template #save>
                          <SaveXlsx :key="currentTable + dateFrom + dateTo" :header="xlsxHeader" :body="xlsxBody" float-right />
                        </template>
        </FTable>
    </div>
  </div>
</template>
