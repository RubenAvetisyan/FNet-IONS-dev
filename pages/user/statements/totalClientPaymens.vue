<script setup>

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

const admins = ['135', '75', '80', '78']
const isAdmin = computed(() => admins.includes(userInfo.value?.uid))
console.log('isAdmin: ', isAdmin.value);

const region = ref(rules[userInfo.value?.uid])
console.log('region: ', region.value);

if (region.value !== rules[userInfo.value?.uid] && !isAdmin.value) {
  await navigateTo('/')
}

const { dateFrom, dateTo } = useDate()

const isDisabled = ref(false)
const toggleDisabled = () => isDisabled.value = !isDisabled.value

const { $isLoading, $startLoading, $finishLoading } = useNuxtApp()

const radMap = ref({
  country: false,
  region: false,
  city: false,
  street: false
})

const prevTable = ref('')
const currentTable = ref(isAdmin.value ? 'country' : 'region')

const query = computed(() => {
  return {
    dateFrom: dateFrom.value,
    dateTo: dateTo.value,
    country: 'Հայաստան',
    ...(region.value && { region: region.value })
  }
})

const fetch = async (extendQuery = {}) => {
  toggleDisabled()
  $startLoading()
  const q = { ...query.value, ...extendQuery }
  console.log('q: ', q);
  const { data, refresh, error } = await useFetch('/api/get-payments-totals', {
    key: dateFrom.value + dateTo.value,
    query: q
  })

  toggleDisabled()
  $finishLoading()
  return { data, refresh, error }
}

const { data, refresh, error } = await fetch({ tabKey: isAdmin.value ? 'country' : 'region' })

const defaultVal = {
  header: ['name', 'ակտիվ', 'պասիվ', 'ընդամենը'],
  body: [
    {
      name: 'some data',
      active: 0,
      passive: 0,
      total: 0
    }
  ]
}

// const brudcoumbs = ref(new Set([{
//   text: 'Հայաստան',
// }]))

// const table = ref(transform(data.value.country, currentTable.value))
const countrayTable = ref(defaultVal)
const regionsTable = ref(defaultVal)
const citiesTable = ref(defaultVal)
const quarterTable = ref(defaultVal)
const streetTable = ref(defaultVal)

onMounted(() => {
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

function transform(data, curTab) {
  if (!data) return

  const fn = async (e, header) => {
    if (header.tabKey === 'street') return router
    console.log('header: ', header);
    prevTable.value = curTab.value + ''
    console.log('prevTable.value: ', prevTable.value);
    curTab.value = typeof header === 'string' ? header : header.nextTabKey || 'country'
    // brudcoumbs.value.add({
    //   text: header.text,
    //   fn: () => curTab.value = header.tabKey
    // })
    console.log('curTab.value: ', curTab.value);
    radMap.value[curTab.value] = true
    if (!header.nextTabKey) query.value = {}
    query.value[header.tabKey] = header.text

    const { data: elseData } = await fetch({
      ...query.value,
      tabKey: header.nextTabKey,
      text: header.text
    })

    console.log('elseData.value: ', elseData.value[currentTable.value]);
    elseData.value[currentTable.value].body.forEach(item => {
      const bodyFirstKey = elseData?.value[currentTable.value].header[0]
      item[bodyFirstKey] = { ...item[bodyFirstKey], fn }
    })

    if (currentTable.value === 'country') countrayTable.value = elseData.value[currentTable.value]
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

async function restart() {
  citiesTable.value = defaultVal
  quarterTable.value = defaultVal
  streetTable.value = defaultVal
  const { data } = await fetch({
    dateFrom, dateTo, tabKey: isAdmin.value ? 'country' : 'region',
    nextTabKey: isAdmin.value ? 'region' : 'city', text: 'Հայաստան'
  })
  console.log('data: ', data.value);
  if (isAdmin.value) {
    // countrayTable.value = defaultVal
    countrayTable.value = data.value.country
  } else {
    // regionsTable.value = defaultVal
    regionsTable.value = data.value.region
  }

  isAdmin.value ? currentTable.value = 'country' : 'region'

  return
}
</script>


<template>
  <div py-4 px-0>
      <div relative flex w-full>
        <div btn rounded-0 hover:bg-indigo-500 bg-indigo-700 dark:bg-indigo-500 h-8 text-center px-2 flex items-center
          text-light dark:text-dark @click="() => currentTable = 'country'">
          ՀԱՅԱՍՏԱՆ
        </div>
        <div v-if="regionsTable.header[0] !== 'name'" btn rounded-0 hover:bg-indigo-500 bg-indigo-700 dark:bg-indigo-500 h-8
          text-center px-2 flex items-center text-light dark:text-dark @click="() => currentTable = 'region'">ՄԱՐԶԵՐ</div>
        <nuxt-link to="/user/statements/totalClients" btn rounded-0 hover:bg-indigo-300 bg-indigo-500 dark:bg-indigo-300 h-8
          text-center px-2 flex items-center text-light dark:text-dark>Տեսնել
          քանակային</nuxt-link>

      </div>
      <div flex>

        <FTable v-show="!$isLoading.value" :key="currentTable + dateFrom + dateTo" :footer="true" :src="dynamicTable"
          transition>
          <template #caption>
            <div flex items-end>
              <DatePicker :is-disabled="isDisabled" ml-10 name="date-from" label="սկիզբ" v-model="dateFrom" />
              <DatePicker :is-disabled="isDisabled" ml-10 name="date-to" label="վերջ" v-model="dateTo" />
              <div flex h-8 f-btn ml-4 p-2 items-center @click="() => restart('region')">Թարմացնել տվյալները</div>
            </div>
          </template>
        </FTable>
    </div>
  </div>
</template>
