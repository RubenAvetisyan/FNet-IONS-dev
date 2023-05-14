<script setup lang="ts">
definePageMeta({
  key: route => route.fullPath,
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
  layout: 'default'
})

const { data: userInfo } = useAuth()
</script>

<template>
  <div>
        <div>Բարի գալուստ` {{ userInfo?.user?.name }}</div>
    <div card container m-5>
      Hellow User
    </div>
  </div>
</template>
