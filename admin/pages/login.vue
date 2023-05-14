<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  }
})

const { status } = useAuth()
if (status.value === 'authenticated') navigateTo('/')
</script>

<template>
    <div class="flex w-full">
      <Suspense>
        <!-- <PageView /> -->
        <template #fallback>
          <div op50 italic>
            <span animate-pulse>Loading...</span>
              <Loading v-show="true" />
            </div>
          </template>
        </Suspense>
        <LoginForm class="mx-auto" />
  </div>
</template>
