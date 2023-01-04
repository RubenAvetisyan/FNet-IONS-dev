<script setup>
import drop from "lodash.drop";
const props = defineProps({
    src: {
        type: Object,
        reqired: true
    }
})

function getPaginatedItems(items, page, pageSize = 0) {
    let pg = page || 1,
        pgSize = pageSize > items.length ? items.length : pageSize,
        offset = (pg - 1) * pgSize,
        pagedItems = drop(items, offset).slice(0, pgSize);
    console.log('items.length: ', items.length);
    return {
        page: pg,
        pageSize: pgSize,
        total: items.length,
        total_pages: Math.ceil(items.length / pgSize),
        data: pagedItems
    };
}

const page = ref(1)

const body = computed(() => {
    return getPaginatedItems(props.src.body, page.value, 12)
})

const firstColumnClass = 'border-r border-indigo-100 dark:border-indigo-500 dark:bg-indigo-600 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center'
</script>

<template>
    <div w="sm md:full" md="max-w-7xl" max="h-2xl" resize="y" overflow="x-hidden" shadow="md" rounded="sm:lg"
        scrollbar="~ track-color-gray-100 dark:track-color-gray-800 thumb-color-indigo-500 dark:thumb-color-indigo-800">
        <table w="full" text="sm left gray-500 dark:gray-400">
            <thead sticky top-0 text="xs indigo-700 dark:gray-300 center" bg="gray-200 dark:indigo-700">
                <tr>
                    <th v-for="header in src.header" :key="header" scope="col" p="x-6 y-3">
                        {{ header }}
                    </th>
                    <!-- <th scope="col" class="py-3 px-6">
                        <span class="sr-only">Edit</span>
                    </th> -->
                </tr>
            </thead>
            <tbody>
                <lazy-f-tr v-for="items in body.data" :key="items[0]">
                    <td v-for="(item, i) in typeof items === 'string' ? items.split(',') : items"
                        :key="src.header[i] + '-' + item" scope="row" p="x-6 y-4" max-w-40
                        :class="[i === 0 && firstColumnClass]">
                        {{ item }}
                    </td>
                    <!-- <td class="py-4 px-6 text-right">
                        <nuxt-link to="#" font-medium text="blue-60 dark:blue-500" hover:underline>Edit</nuxt-link>
                    </td> -->
                </lazy-f-tr>
            </tbody>
        </table>
        <nav sticky bottom-0 flex w-full justify-between items-center pt-1 bg-gray-200 aria-label="Table navigation">
            <span ml-4 font-semibold text-gray-900 dark:text-white>{{ body.total }} տողից՝
                <span text-sm font-normal text-gray-500 dark:text-gray-400>Ցուցադրված է
                    <span font-semibold text-gray-900 dark:text-white>
                        {{ (body.page - 1) * body.pageSize + 1 }}-{{ body.page * body.pageSize }} տողերը
                    </span>
                </span>
            </span>
            <ul v-if="body.total_pages > 1" snap-mandatory snap-x scroll-smooth relative max-w-120 inline-flex
                items-center overscroll="x-contain">
                <li cursor="pointer" block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border
                    border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700
                    dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white @click="page > 0 ? page-- : page">
                    <span sr-only>Previous</span>
                    <div i-mdi-chevron-left w-5 h-5></div>
                </li>
                <li v-for="num in body.total_pages" snap-always cursor="pointer" py-2 px-3 leading-tight text-gray-500
                    bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700
                    dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white
                    :aria-current="num === body.page && 'page'"
                    :class="num === body.page && 'border text-blue-600 bg-blue-50 border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white'"
                    @click="page = num">
                    {{ num }}
                </li>
                <li absolute right-0 cursor="pointer" block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg
                    border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700
                    dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white
                    @click="page < body.total_pages ? page++ : page">
                    <span sr-only>Next</span>
                    <div i-mdi-chevron-right w-5 h-5></div>
                </li>
            </ul>
        </nav>
    </div>
</template>