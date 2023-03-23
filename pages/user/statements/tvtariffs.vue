<script setup>
const { data, pending } = await useFetch('/api/get-all-data')
const passiveCustomers = data.value

const header = passiveCustomers?.length ? Object.keys(passiveCustomers[0]) : []
const body = passiveCustomers?.map((obj) => {
  // if (typeof obj === 'object' && !Array.isArray(obj))
  return Object.values(obj)
}) || []
</script>

<template>
  <div m="4" p="b-50">
    <div v-show="pending" w-screen h-screen absolute top-0 left-0 opacity="70" bg-black />
    <p>TV Տարիֆ</p>
      <!-- <FTable
        :src="{
          header,
          body,
        }" rows="7" class="mt-8"
      /> -->
  </div>
</template>
