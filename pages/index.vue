<script setup>
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

    <div class="text-2xl font-500 text-[#5723ae] dark:text-light select-none">
      Ներքին գործառնությունների իրականացման համակարգ
    </div>
    <div class="text-1xl text-dark dark:text-light select-none">
      համակարգ մուտք գործելու համար անհրաժետ է նույնականացվել
    </div>
  </div>
</template>
