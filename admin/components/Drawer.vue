<script setup>
const isInvisible = ref(true)
const direction = computed(() => isInvisible.value ? 'animate-fade-in-right animate-duration-0.3s' : 'animate-fade-in-left animate-duration-0.3s')
const leftSize = computed(() => isInvisible.value ? 'left-' : 'left-0')
const width = computed(() => {
  return isInvisible.value ? 'w-86' : 'w-14'
})

const listBtn = ref(null)
const sub = ref(null)

const btnFn = () => {
  isInvisible.value = !isInvisible.value
}

const expand = () => {
  if (sub.value instanceof HTMLElement)
    sub.value.classList.toggle('hidden')

  if (listBtn.value instanceof HTMLElement)
    listBtn.value.querySelector('[class*="mdi-chevron-down"]').classList.toggle('-rotate-180')
}
</script>

<template>
  <div
    :class="`fixed h-screen ${width} z-100 p-4 pt-4 shadow-2xl shadow-[#5723ae]
    bg-light dark:bg-gray-800 related duration-300 text-[#5723ae]`"
  >
    <div class="inline-flex">
      <img
        src="/icon.png" class="block float-left mr-2 min-h-6 min-w-6 max-h-12 max-w-12 w-6 h-6 mr-1"
        alt="FNet Telecom Logo"
      >
      <div :class="`origin-left w-full h-full centre duration-300 font-medium ${!isInvisible && 'scale-0'}`">
        FNet
        Telecom
      </div>
    </div>
    <div
      class="bg-light text-dark-purple rounded-full absolute -right-3 top-1 z-100 border shadow-sm shadow-light-700 hover:shadow-purple-700
                                                                                                                                                                                                                                                                                                                                                                                                                                        cursor-pointer"
      @click="btnFn"
    >
      <div :class="`i-mdi-arrow-left-thick text-[#5723ae]  text-md ${!isInvisible && '-rotate-180'} duration-500`" />
    </div>

    <div class="py-4 overflow-y-auto">
      <ul class="space-y-2">
        <li>
          <div
            ref="listBtn"
            class="flex rounded inline-flex hover:bg-[#5723ae] px-1 select-none items-center w-full h-12 text-base font-normal text-gray-900 hover:text-light transition duration-75 rounded-lg group dark:text-white dark:hover:bg-gray-700"
            @click="expand"
          >
            <div class="i-mdi-credit-card-outline block float-left " />
            <span :class="`flex-1 ml-3 text-left whitespace-nowrap ${!isInvisible && 'scale-0'}`">Payment
              System</span>
            <div class="i-mdi-chevron-down" />
          </div>
          <ul id="sub" ref="sub" class="hidden py-2 space-y-2">
            <li>
              <a
                href="#"
                class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >Products</a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >Billing</a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >Invoice</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
