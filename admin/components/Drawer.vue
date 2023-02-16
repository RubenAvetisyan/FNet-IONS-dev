<script setup>
import { storeToRefs } from 'pinia'

const { getWidth, isminified } = storeToRefs(useDrawerStore())
const { adminLeftPanel } = storeToRefs(useAdminStore())
const { minify } = useDrawerStore()

const list = ref(null)
const rotate = ref(0)

const translate = ref('')
const computedMx = ref('')

watch(() => isminified.value, (isMini) => {
  if (isMini) {
    rotate.value = 180
    translate.value = ''
    computedMx.value = 'auto'
  }
  else {
    rotate.value = 0
    translate.value = 'x-8'
    computedMx.value = ''
  }

})

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
    <div fixed h="screen" top="0" z="100" :w="getWidth" :max="`w-${getWidth}`" shadow="xl brand-media"
      bg="light dark:gray-800" transition="duration-700" ease-in-out text="brand-primary" relative>
      <AdminProfile />
      <div absolute right="-3" top="1" z="100" border rounded="full" bg="light" shadow="sm light-700 hover:purple-700"
        cursor="pointer" @click.stop="minify">
        <div i-mdi-arrow-left-thick text="md:brand-primary" transition="duration-500" :class="`rotate-${rotate}`" />
      </div>

      <div overflow="y-auto x-hidden">
        <ul v-if="list.length" space="y-0">
          <n-list-item v-for="item in list" :key="item.name" :exact="item?.type === 'link'"
            :link="item?.link || item?.href || ''" :external="!!item?.href" :href="item?.href"
            :is-menuitem="item.type === 'button' || item?.direct" :name="item?.name" :icon="item?.icon"
            :is-mini="isminified">
            <template #list>
              <n-list-item v-for="sub in item?.sub" :key="sub.name" :exact="sub?.type === 'link'"
                :is-menuitem="sub?.type === 'button'" :link="sub?.link" :external="!!sub?.href" :href="sub?.href" flex
                items="center" w="full" h="12" select="none" text="base gray-900 hover:light-700 dark:hover:gray-700"
                font="normal" duration="75" transition bg="hover:gray-500" :mx="computedMx" :translate="translate"
                class="group">
                <div flex block items="center" w="full" max="md:w-64">
                  <div :key="sub?.icon || sub.name" :mx="computedMx" :class="sub?.icon" :mr="!isminified && 2" />
                  <p v-show="!isminified" antialiased text="base left" max="w-prose">
                    {{ sub.name }}
                  </p>
                </div>
              </n-list-item>
            </template>
          </n-list-item>
        </ul>
      </div>

      <login-button class="absolute bottom-0 left-0 right-0 w-full pb-5" />
    </div>
</ClientOnly>
</template>
