<script setup>
import { format } from 'date-fns'
import { storeToRefs } from 'pinia'
const { setLog, setLogStartDate, logDate } = useAdminStore()
const { logTable } = storeToRefs(useAdminStore())

const date = ref({
  dateFrom: logDate,
  dateTo: format(Date.now(), 'yyyy-MM-dd'),
})

onMounted(() => {
  date.value.dateFrom = logDate
  date.value.value = format(Date.now(), 'yyyy-MM-dd')
})

const summ = ref(0)

const getSumm = (body, index) => formatNumber(body.reduce((previous, current) => {
  return previous + current[index]
}, 0))

watch(() => date.value, async (date) => {
  await setLog(date)
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

useHead({
  title: 'ABilling համակարգի վճարման տրանզակցիաներ',
})
</script>

<template>
  <div m="4" p="b-50">
    <p>ABilling համակարգի վճարման տրանզակցիաներ</p>
    <div w-full max-w-md flex="inline" justify="between" mx-auto mt-2 mb-2 float-left>
      <date-picker v-model="date.dateFrom" name="dateFrom" label="Սկիզբ" ma-0 />
      <date-picker v-model="date.dateTo" name="dateTo" label="Վերջ" ma-0 />
    </div>
    <FTable :src="logTable" class="mt-2">
      <template #default="{ body }">
        <div :key="summ">
          Total: {{ getSumm(body.filteredArray, 3) }} դրամ
        </div>
      </template>
    </FTable>
  </div>
</template>
