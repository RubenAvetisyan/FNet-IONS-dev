<script setup>
const key = Date.now()
</script>

<template>
    <div class="w-full h-screen">
        <div class="w-full bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div v-if="$slots.head" class="sm:hidden">
                    <label v-if="$slots.default" :for="'tabs-' + key" class="sr-only">
                        <slot></slot>
                    </label>
                    <select :id="'tabs-' + key"
                        class="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-brand-secondary focus:border-brand-secondary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-brand-secondary dark:focus:border-brand-secondary">
                        <slot name="head"></slot>
                    </select>
                </div>
                <ul v-if="$slots.list" :id="'fullWidthTab' + key" hidden text="sm center gray-500 dark:gray-400" font="medium"
                    divide="x gray-200 dark:gray-600" sm="flex" rounded="lg"
                    bg="gray-50 hover:gray-100 dark:gray-700 dark:hover:gray-600" focus="outline-none"
                    :data-tabs-toggle="'#fullWidthTabContent-' + key" role="tablist">
                    <slot name="list"></slot>
                </ul>
                <div :id="'fullWidthTabContent-' + key" border="t gray-200 dark:gray-600">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>
