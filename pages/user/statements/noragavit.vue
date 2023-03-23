<script setup>

const { data } = useFetch('/api/conragent-tariff-action-status-address')
</script>

<template>
  <FTable :src="data" />
</template>
