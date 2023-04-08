<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  }
})
</script>

<template>
  <div class="flex w-full">
    <Suspense>
      <!-- <PageView /> -->
      <template #fallback>
        <div op50 italic>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
          <LoginForm class="mx-auto" />
  </div>
</template>
