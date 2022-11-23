<script setup>

defineProps({
    fullName: {
        type: String,
        default: ''
    },
    srcImg: {
        type: String,
        default: ''
    },
    isSmall: {
        type: Boolean,
        default: false
    }
})
const menu = ref(null)

const showMenu = () => {
    if (menu.value instanceof HTMLElement)
        menu.value.classList.toggle('hidden')
}
</script>

<template>
    <div class="w-full max-w-sm relative bg-white border-b border-[#5723ae] dark:bg-gray-800 dark:border-gray-700">
        <div
            :class="`${isSmall && 'absolute right-0 bottom-0 justify-end px-4 pt-4'} transform-gpu duration-500 fade-transition ease-in-out`">
            <div id="dropdownButton"
                class="cursor-pointer inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                @click="showMenu">
                <span class="sr-only">Open dropdown</span>
                <div class="w-6 h-6 i-mdi-dots-horizontal"></div>
            </div>
            <!-- Dropdown menu -->
            <div id="dropdown" ref="menu"
                class="absolute z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700">
                <ul class="py-1" aria-labelledby="dropdownButton">
                    <list-item v-for="item in ['', 'Անձնական հաշիվ']">{{ item }}</list-item>
                </ul>
            </div>
        </div>
        <div class="flex flex-col items-center pb-4">
            <img v-if="srcImg" class="w-12 h-12 mb-3 rounded-full shadow-lg" :src="srcImg" alt="Bonnie image" />
            <div v-else class="w-12 h-12 mb-3 flex rounded-full shadow-lg font-bold text-3xl items-center text-center">
                <span class="flex  mx-auto">A</span>
            </div>
            <h5 v-if="fullName" class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
            <span class="text-sm text-gray-500 dark:text-gray-400">Admin</span>
            <div v-if="$slots.footer" class="flex mt-4 space-x-3 md:mt-6">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>