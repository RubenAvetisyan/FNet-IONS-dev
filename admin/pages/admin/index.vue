<script setup lang="ts">
definePageMeta({
  // key: route => route.fullPath
  auth: false
})
</script>

<template>
  <div>
    <Suspense>
      <!-- <PageView /> -->
      <template #fallback>
        <div op50 italic>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>

    <admin-card min-w-md max-w-ld min-h-md self-center mt-20>
      <div font="bold">
        Dashboard
      </div>
    </admin-card>
  </div>
</template>
