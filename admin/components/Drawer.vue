<script setup>
import { storeToRefs } from 'pinia'
const route = useRoute()

const isVisible = ref(true)

const width = computed(() => {
  return isVisible.value ? 'w-86' : 'w-14'
})

const { adminLeftPanel } = storeToRefs(useAdminStore())

const btnFn = () => {
  isVisible.value = !isVisible.value
}

const chevron = computed(() => isVisible.value ? 'i-mdi-chevron-up' : 'i-mdi-chevron-down')
</script>

<template>
  <ClientOnly>
    <div
      class="fixed h-screen z-100 shadow-2xl shadow-[#5723ae] bg-light dark:bg-gray-800 relative duration-300 text-[#5723ae]"
      :class="[width]">
      <div class="w-full">
        <Profile :is-small="isVisible" />
      </div>
      <div
        class="bg-light text-dark-purple rounded-full absolute -right-3 top-1 z-100 border shadow-sm shadow-light-700 hover:shadow-purple-700
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      cursor-pointer"
        @click="btnFn">
        <div class="i-mdi-arrow-left-thick text-[#5723ae] text-md transition duration-500"
          :class="[(!isVisible && '-rotate-180')]" />
      </div>

      <div class="overflow-y-auto" :class="[(isVisible && 'p-4')]">
        <ul v-if="adminLeftPanel.list.length" class="space-y-1">
          <n-list-item v-for="item in adminLeftPanel.list" :key="item.name" :exact="item?.type === 'link'"
            :link="item?.link || ''" :is-menuitem="item.type === 'button'">
            <div
              class="hover:bg-[#5723ae] select-none items-center w-full h-12 text-base font-normal text-gray-900 hover:text-light transition duration-75 group dark:text-white dark:hover:bg-gray-700"
              :class="[
                                              (isVisible && 'px-1 flex inline-flex rounded rounded-lg'),
                                              (!isVisible && 'flex items-center justify-center'),
                                            ]">
              <div class="block float-left h-full" :class="[item?.icon || '']" />
              <span v-show="isVisible" class="flex-1 ml-3 text-left whitespace-nowrap">{{ item.name }}</span>
              <div v-if="item.type === 'button'" :class="chevron" />
            </div>
          
            <template #list>
              <n-list-item v-for="sub in item?.sub" :key="sub.name" :exact="sub?.type === 'link'"
                :is-menuitem="sub?.type === 'button'" :link="sub?.link" :href="sub?.href"
                class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 group hover:bg-gray-500 hover:text-light-700 dark:text-white dark:hover:bg-gray-700"
                :class="[(isVisible && 'pl-9')]">
                <div :class="sub?.icon || 'i-mdi-alphabetical'" />
                <span v-show="isVisible">{{ sub.name }}</span>
              </n-list-item>
            </template>
          </n-list-item>
          </ul>
          </div>
          
          <login-button v-if="route.path !== '/login'" class="absolute bottom-0 float-left"></login-button>
    </div>
  </ClientOnly>
</template>
