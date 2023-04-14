<script setup lang="ts">

const { data: userInfo } = useAuth()
const { isAdmin } = useAdminAuthStore()
console.log('isAdmin: ', isAdmin);

const updates = ref(0)

const { pending, data: payments } = useLazyAsyncData('payments', () => $fetch('/api/b2b-payments'), {
  transform: data => {
    console.log('data: ', data);
    return {
      header: ['Պայանագրի №', 'գումար'], body: data.body.map(({ contractNumber, summa }) => ({
        'Պայանագրի №': contractNumber,
        'գումար': summa
      }))
    }
  },
  watch: [updates]
})

const result = ref({
  body: [{
    contractNumber: 0,
    summa: 0
  }],
  header: ['Պայանագրի №', 'գումար']
})

onMounted(() => {
  nextTick(() => {
    if (userInfo.value?.uid !== '145' && !isAdmin) navigateTo('/')
  })
})

watch(payments, (oldPayments, newPayments) => {
  console.log('oldPayments: ', oldPayments?.value);
  console.log('newPayments: ', newPayments?.value);
  if (newPayments?.value)
    result.value = newPayments.value
  // Because count starts out null, you won't have access
  // to its contents immediately, but you can watch it.
}, {
  deep: true,
  immediate: true
})
</script>

<template>
  <div>
    <div f-btn @click="() => updates++">Թարմացնել տվյալները</div>

    <FTable :src="result"></FTable>
  </div>
</template>
