<script setup>
definePageMeta({
  auth: false
})

const { data, pending } = useFetch('/api/get-passive-clients-full')
const passiveCustomers = data.value

const header = passiveCustomers?.length ? Object.keys(passiveCustomers[0]) : []
const body = passiveCustomers?.map((obj) => {
  // if (typeof obj === 'object' && !Array.isArray(obj))
  return Object.values(obj)
}) || []
</script>

<template>
  <div m="4" p="b-50">
    <div v-show="pending" w-screen h-screen absolute top-0 left-0 opacity="70" bg-black dark:bg-white />
    <p>Պասիվ հաճախորդների ցանկ</p>
    <FTable v-if="body.length" :src="{
      header,
      body,
    }" rows="7" class="mt-8" />
  </div>
</template>
