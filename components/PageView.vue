<script setup lang="ts">
const { data } = await useFetch('/api/pageview')

const time = useTimeAgo(computed(() => data.value ? data.value.startAt : ''))
</script>

<template>
  <div text-gray:80>
    <span font-500 text-gray>{{ data?.pageview }}</span>
    page views since
    <span text-gray>{{ time }}</span>
      <!-- <button m-3 text-sm f-btn @click="pause">
      pause
    </button> -->
  </div>
</template>
