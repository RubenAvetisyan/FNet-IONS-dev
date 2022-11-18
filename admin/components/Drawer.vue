<script setup>

const isInvisible = ref(true)
const direction = computed(() => isInvisible.value ? 'animate-fade-in-right animate-duration-0.3s' : 'animate-fade-in-left animate-duration-0.3s')
const leftSize = computed(() => isInvisible.value ? 'left-' : 'left-0')
const btnOpenFn = () => isInvisible.value = true
const btnCloseFn = () => isInvisible.value = false
</script>

<template>
    <div class="all:transition-400">
        <!-- drawer init and toggle -->
        <div class="text-center">
            <button
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                type="button" @click="btnOpenFn">
                Show left drawer
            </button>
        </div>

        <!-- drawer component -->
        <div :class="`fixed h-screen w-86 top-0 ${leftSize} z-100 flex pa-2 shadow-2xl shadow-[#5723ae] 
        bg-light dark:bg-gray-800 ${direction}`">
            <div class="flex inline-block mx-auto h-12 w-full h-12">
                <div>
                    <img src="/icon.png" class="h-6 mr-3 sm:h-9" alt="FNet Telecom Logo" />
                </div>
                <div class="flex offset-x w-full h-full centre">FNet Telecom</div>
                <div class="float-right btn min-h-8 min-w-8 h-8 w-8 text-center centre items-center bg-bluegray dark:bg-light"
                    @click="btnCloseFn">
                    <span icon="mdi:window-close" class="dark:text-light"></span>
                </div>
            </div>
        </div>
    </div>
</template>