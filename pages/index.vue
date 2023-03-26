<script setup>
definePageMeta({ auth: false })

const { data } = await useLazyFetch('/api/lanbilling')
console.log('data: ', unref(data))



const refs = ref([])

const tablesrefs = computed(() => refs.value)


onMounted(async () => {
  const { data: aBillingSchema } = await useFetch('/api/get-abilling-db-schema')
  nextTick(() => console.log('aBillingSchema.value: ', aBillingSchema.value))
})
</script>

<template>
  <div>
    <Logos mb-6 />
    <Suspense>
      <!-- <PageView /> -->
      <template #fallback>
        <div op50 italic>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
    <!-- <InputEntry /> -->

    <div font="500" text="2xl brand-primary dark:light-50" select="none">
      Ներքին գործառնությունների իրականացման համակարգ
    </div>
    <div text="xl dark dark:light-700" select="none">
      համակարգ մուտք գործելու համար անհրաժետ է նույնականացվել
    </div>
          <pre>{{ tablesrefs }}</pre>
  </div>
</template>
