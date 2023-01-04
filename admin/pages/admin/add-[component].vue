<script setup>
const componentName = ref('name')
</script>

<template>
    <admin-card m-5 w-7xl min-w-4xl h-3xl grow>
        <template #full>
            <div w-full>
                <div grid grid-cols-4 gap-4 justify-between relative>
                    <FInput label="Component Name" v-model="componentName" />
                </div>
                <div>TODO</div>
            </div>
        </template>
    </admin-card>
    <admin-card m-5 w-7xl min-w-4xl h-3xl grow></admin-card>
</template>