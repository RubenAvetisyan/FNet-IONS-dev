<script setup lang="ts">
import { storeToRefs } from 'pinia'

const route = useRoute()
const { data } = useAuth()

const isAllowed = ref(data.value?.isAdmin)

const { getWidth, isminified } = storeToRefs(useDrawerStore())
const { adminLeftPanel } = storeToRefs(useAdminStore())
const { minify } = useDrawerStore()

const list = ref<AdminStoreList[]>()
const rotate = ref(0)

const translate = ref('')
const computedMx = ref('')
const profileName = ref(data.value?.user?.name)

watch(() => isminified.value, (isMini) => {
  if (isMini) {
    rotate.value = 180
    translate.value = ''
    computedMx.value = 'auto'
    profileName.value = data.value?.user?.name ? data.value?.user?.name[0] : ''
  }
  else {
    rotate.value = 0
    translate.value = 'x-8'
    computedMx.value = ''
    profileName.value = data.value?.user?.name
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
      <AdminProfile :full-name="profileName" />
      <div absolute right="-3" top="1" z="100" border rounded="full" bg="light"
        shadow="sm light-700 hover:brand-secondary" cursor="pointer" @click.stop="minify">
        <div i-mdi-arrow-left-thick text="md:brand-primary" transition="duration-500" :class="`rotate-${rotate}`" />
      </div>

      <div overflow="y-auto x-hidden">
        <ul v-if="list?.length && isAllowed" space="y-0">
          <n-list-item v-for="item in list || []" :key="item.name" :exact="item?.type === 'link'"
            :link="item?.link || item?.href || ''" :external="!!item?.href" :href="item?.href"
            :is-menuitem="item.type === 'button' || !!item?.direct" :name="item?.name" :icon="item?.icon"
            :is-mini="isminified.value">

            <template #list>
              <n-list-item v-for="sub in item?.sub" :key="sub.name" :exact="sub?.type === 'link'"
                :is-menuitem="sub?.type === 'button'" :link="sub?.link" :external="!!sub?.href" :href="sub?.href" flex
                items="center" w="full" h="12" select="none" text="base gray-900 hover:light-700 dark:hover:gray-700"
                font="normal" duration="75" transition bg="hover:gray-500" :mx="computedMx" :translate="translate"
                tooltip-placement="right" :class="`group/${sub.name}`">
                <div flex block items="center" w="full" max="md:w-64">
                  <div :key="sub?.icon || sub.name + '-icon'" :mx="computedMx" :class="sub?.icon"
                    :mr="!isminified && 2" />
                  <p v-show="!isminified" antialiased text="base left" max="w-prose">
                    {{ sub.name }}
                  </p>

                </div>
              </n-list-item>
            </template>
          </n-list-item>
        </ul>
      </div>

      <LoginButton :is-mini="isminified.value" class="absolute bottom-0 left-0 right-0 rounded-0 w-full pb-5" />
    </div>
  </ClientOnly>
</template>
