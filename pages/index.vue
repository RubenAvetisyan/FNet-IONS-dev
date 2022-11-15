<script setup>
const { data } = await useLazyFetch('/api/lanbilling')
console.log('data: ', unref(data))
</script>

<template>
  <div>
    <Logos mb-6 />
    <Suspense>
      <PageView />
      <pre />
      <template #fallback>
        <div op50 italic>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
    <InputEntry />
  </div>
</template>
