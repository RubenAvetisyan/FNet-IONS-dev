<template>
  <div
    ref="listBtn"
    :class="`${$refs.parent isVisible && 'px-1 flex inline-flex rounded rounded-lg'} ${!isVisible && 'flex items-center justify-center'} hover:bg-[#5723ae] select-none items-center w-full h-12 text-base font-normal text-gray-900 hover:text-light transition duration-75 group dark:text-white dark:hover:bg-gray-700`"
    @click="expand"
  >
    <div class="i-mdi-credit-card-outline block float-left" />
    <div v-show="isVisible" class="flex-1 ml-3 text-left whitespace-nowrap">
      Payment System
    </div>
    <div class="i-mdi-chevron-down" />
  </div>
</template>
