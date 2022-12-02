<script setup>
import { storeToRefs } from 'pinia'

const { getWidth, isminified } = storeToRefs(usedrawerStore())
const { adminLeftPanel } = storeToRefs(useAdminStore())
const { minify } = usedrawerStore()

const list = ref(null)

watch(adminLeftPanel.value, (panel) => { 
  list.value = panel.list
}, {
  immediate: true,
  deep: true,
  flush: 'sync',
})
</script>

<template>
  <ClientOnly>
  <div
    :class="`fixed h-screen top-0 z-100 ${getWidth} max-${getWidth} shadow-2xl shadow-[#5723ae] bg-light dark:bg-gray-800 relative duration-300 text-[#5723ae]`">
    <Profile />
    <div
      class="bg-light rounded-full absolute -right-3 top-1 z-100 border shadow-sm shadow-light-700 hover:shadow-purple-700 cursor-pointer"
      @click="() => minify(isminified)">
      <div class="i-mdi-arrow-left-thick text-[#5723ae] text-md transition duration-500"
        :class="[!isminified && '-rotate-180']" />
    </div>
  
    <div class="overflow-y-auto">
      <ul v-if="list.length" class="space-y-0">
        <n-list-item v-for="item in list" :key="item.name" :exact="item?.type === 'link'"
          :link="item?.link || item?.href || ''" :is-menuitem="item.type === 'button'" :name="item?.name"
          :icon="item?.icon" :is-mini="isminified">
    
          <template #list>
            <n-list-item v-for="sub in item?.sub" :key="sub.name" :exact="sub?.type === 'link'"
              :is-menuitem="sub?.type === 'button'" :link="sub?.link" :href="sub?.href"
              class="flex items-center select-none w-full h-12 text-base font-normal text-gray-900 transition duration-75 group hover:bg-gray-500 hover:text-light-700 dark:text-white dark:hover:bg-gray-700"
              :class="[!isminified ? 'pl-12' : 'mx-auto']">
              <div class="flex block items-center w-full max-w-64">
                <div :class="[sub?.icon,isminified ?'mx-auto': 'mr-2']" :key="(sub?.icon || sub.name)" />
                <p v-show="!isminified" class="text-base max-w-prose antialiased text-left">{{ sub.name }}</p>
              </div>
            </n-list-item>
          </template>
        </n-list-item>
      </ul>
    </div>
    
    <login-button class="absolute bottom-0 left-0 right-0 w-full pb-5"></login-button>
    </div>
  </ClientOnly>
</template>
