<script setup>
import { storeToRefs } from 'pinia'
const props = defineProps({
  fullName: {
    type: String,
    default: '',
  },
  srcImg: {
    type: String,
    default: '',
  },
  isSmall: {
    type: Boolean,
    default: false,
  },
})

const { isminified } = storeToRefs(useDrawerStore())
const { user, getSessionId } = useAdminAuthStore()

onMounted(() => {

})

const avatar = computed(() => {
  if (!user?.fullName && props.fullName)
    return ''
  return (user.fullName[0] || props.fullName).toUpperCase()
})

const token = computed(() => 123)

const type = computed(() => {
  return user?.groupId?.includes(UserGroupId.Admin) ? UserGroupName.Admin : user?.type || ''
})

const notMenu = ref(true)

const showMenu = () => {
  notMenu.value = !notMenu.value
}

const testLink = `https://t.me/fnetIoSystemBot?start=${encodeURIComponent(token.value)}`
</script>

<template>
  <div w="full" max="w-sm" bg="white dark:gray-800" border="b brand-primary dark:gray-700" relative>
    <div duration="500" transform="gpu" fade="transition" ease="in-out"
      :class="!isminified && 'absolute right-0 bottom-0 justify-end px-4 pt-4'">
      <div id="dropdownButton" cursor="pointer" inline="block" text="sm gray-500 dark:gray-400"
        bg="hover:gray-100 dark:hover:gray-700" focus="ring-4 outline-none ring-gray-200 dark:ring-gray-700" rounded="lg"
        p="1.5" @click.stop="showMenu">
        <span sr="only">Open dropdown</span>
        <div w="6" h="6" class="i-mdi-dots-horizontal" />
      </div>
      <!-- Dropdown menu -->
      <div id="dropdown" absolute z="100" w="44" rounded :hidden="notMenu" text="base" list="none"
        bg="white dark:gray-700" divide="y gray-100" shadow>
        <ul p="y-1" aria-labelledby="dropdownButton">
          <n-list-item v-for="item in ['Անձնական հաշիվ']" :key="item" :is-menuitem="true" cursor="pointer">
            {{ item }}
          </n-list-item>
          <li>
            <nuxt-link :to="testLink" btn-blue h-12>
              <span class="i-mdi-telegram" />
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <div display="flex" flex="col" items="center" p="b-4">
      <!-- AVATAR -->
      <img v-if="srcImg" w="12" h="12" m="b-3" rounded="full" shadow="lg" :src="srcImg" alt="Bonnie image">
      <div v-else w="12" h="12" m="b-3" flex rounded="full" shadow="lg bg-brand-media" font="bold" text="3xl center"
        items="center">
        <span flex m="x-auto">{{ avatar }}</span>
      </div>
      <!-- USER FULL NAME -->
      <h5 v-if="fullName" m="b-1" text="xl gray-900 dark:white" font="medium">
        {{ fullName }}
      </h5>
      <div w="full" text="sm gray-500 dark:gray-400" overflow="x-hidden">
        {{ type }}
      </div>
      <div v-if="$slots.footer" flex space="x-3" m="t-4 md:t-6">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
