<template>
    <div class="w-full h-screen">
        <div class="w-full bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div v-if="$slots.head" class="sm:hidden">
                <label v-if="$slots.default" for="tabs" class="sr-only">
                    <slot></slot>
                </label>
                <select id="tabs"
                    class="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <slot name="head"></slot>
                </select>
            </div>
            <ul v-if="$slots.list" id="fullWidthTab" hidden text="sm center gray-500 dark:gray-400" font="medium"
                divide="x gray-200 dark:gray-600" sm="flex" rounded="lg"
                bg="gray-50 hover:gray-100 dark:gray-700 dark:hover:gray-600" focus="outline-none"
                data-tabs-toggle="#fullWidthTabContent" role="tablist">
                <slot name="list"></slot>
            </ul>
            <div id="fullWidthTabContent" border="t gray-200 dark:gray-600">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>