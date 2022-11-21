<script setup>

const isInvisible = ref(true)
const direction = computed(() => isInvisible.value ? 'animate-fade-in-right animate-duration-0.3s' : 'animate-fade-in-left animate-duration-0.3s')
const leftSize = computed(() => isInvisible.value ? 'left-' : 'left-0')
const width = computed(() => {
    return isInvisible.value ? 'w-86' : 'w-14'
})

const btnFn = () => {
    isInvisible.value = !isInvisible.value
}

</script>

<template>
    <div :class="`fixed h-screen ${width} top-0 left-0 z-100 p-4 pt-4 shadow-2xl shadow-[#5723ae] 
    bg-light dark:bg-gray-800 related duration-300 text-[#5723ae]`">
        <div class="inline-flex">
            <img src="/icon.png" class="block float-left mr-2 min-h-6 min-w-6 max-h-12 max-w-12 w-6 h-6 mr-1"
                alt="FNet Telecom Logo" />
    
            <div :class="`origin-left w-full h-full centre duration-300 font-medium ${!isInvisible && 'scale-0'}`">FNet
                Telecom</div>
        </div>
        <div class="bg-light text-dark-purple rounded-full absolute -right-3 top-1 z-100 border shadow-sm shadow-light-700 hover:shadow-purple-700
                                                                                                                                                                                                                                                                                                                                                                                                                                        cursor-pointer"
            @click="btnFn">
            <div :class="`i-mdi-arrow-left-thick text-[#5723ae]  text-md ${!isInvisible && '-rotate-180'} duration-500`">
            </div>
        </div>
    
        <div class="py-4 overflow-y-auto">
            <ul class="space-y-2">
                <li>
                    <button type="button"
                        class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                        <svg aria-hidden="true"
                            class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="flex-1 ml-3 text-left whitespace-nowrap">E-commerce</span>
                        <div class="i-mdi-chevron-down">
                        </div>
                    </button>
                    <ul id="dropdown-example" class="hidden py-2 space-y-2">
                        <li>
                            <a href="#"
                                class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Products</a>
                        </li>
                        <li>
                            <a href="#"
                                class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Billing</a>
                        </li>
                        <li>
                            <a href="#"
                                class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Invoice</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>