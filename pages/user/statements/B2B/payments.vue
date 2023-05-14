<script setup lang="ts">

const { data: userInfo } = useAuth()



const updates = ref(0)

const { pending, data: payments } = await useLazyAsyncData('payments', () => $fetch('/api/b2b-payments'), {
  transform: data => {
    console.log('data: ', data);
    return {
      header: ['Սակագին', 'Հավաքագրված գումար'],
      body: data.body.map(({ tariff, summa }) => ({
        tariff,
        summa
      }))
    }
  },
  watch: [updates]
})

const result = ref({
  header: ['Սակագին', 'Հավաքագրված գումար'],
  body: [{
    tariff: '',
    summa: 0
  }],
})

onMounted(() => {
  nextTick(() => {
    const isAllowed = userInfo.value?.uid !== '145' || !userInfo.value?.isAdmin
    console.log('isAllowed: ', isAllowed);
    if (!isAllowed) {
      navigateTo({
        path: '/protected'
      })
    }
  })
})

watch(() => payments.value, (newPayments, oldPayments) => {

  if (newPayments && JSON.stringify(newPayments) !== JSON.stringify(oldPayments))
    result.value = newPayments
  // Because count starts out null, you won't have access
  // to its contents immediately, but you can watch it.
}, {
  deep: true,
  immediate: true
})
</script>

<template>
    <div fixed flex flex-col top-0 bottom-0 w-3xl>
      <div f-btn max-w-prose @click="() => updates++">Թարմացնել տվյալները</div>

      <FTable :src="result" :rows="result.body.length" :footer="true" name="Ըստ սակագնի B2B Վճարումների մասին">
        <template #default="{ body }">
                      <div w-full>
                        <span font-black>ընդամենը հավաքագրված գումար՝ </span>
                        <span font-bold>{{ body.data.reduce((p: number, c: any) => p + c.summa, 0) }}</span>
                      </div>
        </template>
      </FTable>
  </div>
</template>
