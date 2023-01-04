<script setup lang="ts">
definePageMeta({
    key: route => route.fullPath
})

const { savedName } = useUserStore()
</script>

<template>
    <div>
        <div>Բարի գալուստ` {{ savedName }}</div>
        <div card container m-5>Hellow User</div>
    </div>
</template>