<script setup>

const { data: user } = useAuth()

if (user.value && !user.value.isAdmin) {
  navigateTo({
    path: '/protected'
  })
}

const { data, pending } = useFetch('/api/get-passive-clients')
const passiveCustomers = data.value

const header = passiveCustomers?.header || []
const body = passiveCustomers?.body || []
console.log('body: ', body);
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
