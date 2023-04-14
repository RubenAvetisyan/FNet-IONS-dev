<script setup>
import { format } from 'date-fns'
import { storeToRefs } from 'pinia'

const { $startLoading, $finishLoading } = useNuxtApp()

const { setLog, setLogStartDate, logDate } = useAdminStore()
const { logTable } = storeToRefs(useAdminStore())

const date = ref({
  dateFrom: logDate,
  dateTo: format(Date.now(), 'yyyy-MM-dd'),
})

onMounted(() => {
  date.value.dateFrom = logDate
  date.value.dateTo = format(Date.now(), 'yyyy-MM-dd')
})

const summ = ref(0)
let src = ref(unref(logTable))
const filters = computed(() => {
  return src.value.header.map((_, i) => i === src.value.header.indexOf('Վճարման եղանակ') ? 'Онлайн платежи' : '')
})
console.log('filters: ', filters.value);


const getSumm = (body, index) => formatNumber(body.reduce((previous, current) => {
  return previous + Object.values(current)[index]
}, 0))

watch(() => date.value, async (date) => {
  src.value = null
  $startLoading()
  await setLog(date)
  $finishLoading()
  src.value = unref(logTable)
  setLogStartDate(date.dateFrom)

  // refreshNuxtData(date)
}, {
  deep: true,
  immediate: true,
  flush: true,
})

function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

const currentDate = format(Date.now(), 'yyyy-MM-dd - H b', {
  weekStartsOn: 1,
})

useHead({
  title: 'ABilling համակարգի վճարման տրանզակցիաներ',
})
</script>

<template>
        <div m="4" p="b-50">
          <FTable v-if="src" :src="src" :footer="true" name="ABilling համակարգի միջոցով վճարված տրանզակցիաների"
            :save-as-filename="'Termin Payments ' + currentDate" :filters="filters" class="mt-2">
            <template #caption>
              <div w-full max-w-xs flex="inline" justify="between" mx-auto mt-2 mb-2 mr-2 float-left>
                <date-picker v-model="date.dateFrom" name="dateFrom" label="Սկիզբ" ma-0 />
                <date-picker v-model="date.dateTo" name="dateTo" label="Վերջ" ma-0 />
              </div>
            </template>

            <template #default="{ body }">
              <div :key="summ" text-brand-primary>
                <span font-black font-medium>ընդամենը:</span> {{ getSumm(body.filteredArray, 3) }} դրամ
        </div>
      </template>
    </FTable>
  </div>
</template>
