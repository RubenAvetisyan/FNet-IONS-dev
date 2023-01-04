<script setup>
import { storeToRefs } from 'pinia'
const { setLog } = useAdminStore()
const { logTable } = storeToRefs(useAdminStore())

setLog('2022-11-11')
</script>

<template>
    <div m="4" p="b-50">
        <p>ABilling համակարգի վճարման տրանզակցիաներ</p>
        <FTable :src="logTable" class="mt-8" />
    </div>
</template>