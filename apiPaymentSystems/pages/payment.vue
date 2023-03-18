<script setup lang="ts">
definePageMeta({ auth: false })
</script>

<template>
  <div>
    <Suspense>
      <template #fallback>
        <div op50 italic>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
    <Info />
  </div>
</template>
