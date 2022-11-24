<script setup>
const isVisible = ref(true)
const width = computed(() => {
  return isVisible.value ? 'w-86' : 'w-14'
})

const listBtn = ref(null)
const sub = ref(null)

const btnFn = () => {
  isVisible.value = !isVisible.value
}

const expand = () => {
  if (sub.value instanceof HTMLElement)
    sub.value.classList.toggle('hidden')

  if (listBtn.value instanceof HTMLElement)
    listBtn.value.querySelector('[class*="mdi-chevron-down"]').classList.toggle('-rotate-180')
}

const tRef = { el: ref([]) }
const el = computed(() => tRef.el)
</script>

<template>
  <div :class="`fixed h-screen ${width} z-100 shadow-2xl shadow-[#5723ae]
  bg-light dark:bg-gray-800 relative duration-300 text-[#5723ae]`">
    <div class="w-full">
      <Profile :is-small="isVisible" />
    </div>
    <div
      class="bg-light text-dark-purple rounded-full absolute -right-3 top-1 z-100 border shadow-sm shadow-light-700 hover:shadow-purple-700
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          cursor-pointer"
      @click="btnFn">
      <div
        :class="`i-mdi-arrow-left-thick text-[#5723ae]  text-md ${!isVisible && '-rotate-180'}transition duration-500`" />
    </div>
    <div :class="`${isVisible && 'p-4'} overflow-y-auto`">
      <ul class="space-y-1">
        <list-item :ref="el" class="bg-light-7">
          <div ref="listBtn"
            :class="`${isVisible && 'px-1 flex inline-flex rounded rounded-lg'} ${!isVisible && 'flex items-center justify-center'} hover:bg-[#5723ae] select-none items-center w-full h-12 text-base font-normal text-gray-900 hover:text-light transition duration-75 group dark:text-white dark:hover:bg-gray-700`"
            @click="expand">
            <div class="i-mdi-credit-card-outline block float-left" />
            <div v-show="isVisible" class="flex-1 ml-3 text-left whitespace-nowrap">
              Payment System
            </div>
            <div class="i-mdi-chevron-down" />
          </div>
          <ul id="sub" ref="sub" class="hidden  space-y-0">
            <list-tiem :ref="el" v-for="item in ['Products', 'Billing', 'Invoice']" :key="item"
              :class="`${isVisible && 'pl-9'} flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 group hover:bg-gray-500 hover:text-light-700 dark:text-white dark:hover:bg-gray-700`">
              <div class="i-mdi-numeric" />
              <span v-show="isVisible">{{ item }}</span>
            </list-tiem>
          </ul>
        </list-item>
        <list-item :ref="el" class="bg-light-7">
          <div ref="listBtn"
            :class="`${isVisible && 'px-1 flex inline-flex rounded rounded-lg'} ${!isVisible && 'flex items-center justify-center'} hover:bg-[#5723ae] select-none items-center w-full h-12 text-base font-normal text-gray-900 hover:text-light transition duration-75 group dark:text-white dark:hover:bg-gray-700`"
            @click="expand">
            <div class="i-mdi-credit-card-outline block float-left" />
            <div v-show="isVisible" class="flex-1 ml-3 text-left whitespace-nowrap">
              Payment System
            </div>
            <div class="i-mdi-chevron-down" />
          </div>
          <ul id="sub" ref="sub" class="hidden  space-y-0">
            <list-tiem :ref="el" v-for="item in ['Products', 'Billing', 'Invoice']" :key="item"
              :class="`${isVisible && 'pl-9'} flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 group hover:bg-gray-500 hover:text-light-700 dark:text-white dark:hover:bg-gray-700`">
              <div class="i-mdi-numeric" />
              <span v-show="isVisible">{{ item }}</span>
            </list-tiem>
          </ul>
        </list-item>
        <list-item :exact="true" link="/admin/administrating" class="bg-light-7 h-12 items-center text-center mx-auto">
          <template #icon>
            <div class="i-carbon-dashboard">
      
            </div>
          </template>
          <span>Ադմինիստրավորում</span>
        </list-item>
      </ul>
    </div>
  </div>
</template>
