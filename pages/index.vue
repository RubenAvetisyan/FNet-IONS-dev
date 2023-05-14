<script setup>
// import { keys } from 'lodash';


// const { data } = await useLazyFetch('/api/lanbilling')
// console.log('data: ', unref(data))



// const refs = ref([])

// const tablesrefs = computed(() => refs.value)


// onMounted(async () => {
//   const { data: aBillingSchema } = await useFetch('/api/get-abilling-db-schema')
//   nextTick(() => console.log('aBillingSchema.value: ', aBillingSchema.value))
// })

const { status, data: userInfo } = useAuth()

console.log('userInfo.isAdmin: ', userInfo.isAdmin);
// if (!userInfo.isAdmin) navigateTo({
//   path: '/user/statements/totalClients',
//   force: true
// })

// const rules = {
//   '127': 'Երևան',
//   '224': 'Երևան',
//   '138': 'Երևան',
//   '195': 'Արարատի մարզ',
//   '227': 'Վայոց Ձորի մարզ',
//   '123': 'Գյումրի',
//   '265': 'Գյումրի',
//   '236': 'Գեղարքունիքի մարզ',
//   '54': 'Կոտայքի մարզ',
//   '225': 'Կոտայքի մարզ',
// }

// nextTick(() => {
//   if (useAdminAuthStore().isAdmin) {
//     // navigateTo('/', { external: true })
//   } else if (Object.keys(rules).includes(userInfo.value.uid)) {
//     navigateTo('/user/statements/totalClients', { external: true })
//   }
// })
</script>

<template>
    <div>
      <Logos mb-6></Logos>
      <Suspense>
        <template #fallback>
          <div op50 italic>
            <span animate-pulse>Loading...</span>
          </div>
        </template>
      </Suspense>

      <div font="500" text="2xl brand-primary dark:light-50" select="none">
        Ներքին գործառնությունների իրականացման համակարգ
      </div>
      <div v-if="status === 'unauthenticated'" text="xl dark dark:light-700" select="none">
        համակարգ մուտք գործելու համար անհրաժետ է նույնականացվել
      </div>
  </div>
</template>
