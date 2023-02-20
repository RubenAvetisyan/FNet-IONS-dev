<script setup>
definePageMeta({ middleware: "guest", auth: false })

const { data } = await useLazyFetch('/api/lanbilling')
console.log('data: ', unref(data))
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
  </div>
</template>
