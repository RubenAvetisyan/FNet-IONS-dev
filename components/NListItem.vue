<script setup>
import { storeToRefs } from 'pinia'

const props = defineProps({
  href: {
    type: String,
    default: '',
  },
  link: {
    type: String,
    default: '',
  },
  isMenuitem: {
    type: Boolean,
    default: false,
  },
  exact: {
    type: Boolean,
    default: false,
  },
  external: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  isMini: {
    type: Boolean,
    default: false,
  },
  tooltipPlacement: {
    type: String,
    default: 'right'
  }
})

const { getLinks, getListItemBtnVisiblity } = storeToRefs(useSysStore())
const { onInit } = useSysStore()

const storeKey = onInit()
const links = getLinks.value(storeKey)

const isVisible = getListItemBtnVisiblity.value(storeKey)
// console.log('isVisible: ', isVisible);
const { getRoutes } = useRouter()

const active = 'block pr-4 text-white bg-brand-primary rounded md:bg-transparent md:text-[#e30083] md:p-0 dark:md:text-white'
const passive = 'block pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#e30083] md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
const dClass = 'block text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
const linkClass = ref(props.isMenuitem ? dClass : passive)

const tooltipId = (key) => `${key.replaceAll(' ', '-')}-tooltip`
const chevron = computed(() => isVisible ? 'i-mdi-chevron-up' : 'i-mdi-chevron-down')
</script>

<template>
<<<<<<< HEAD
    <li :key="storeKey" :links-key="storeKey" :data-tooltip-target="tooltipId(name)"
      :data-tooltip-placement="tooltipPlacement || 'right'" relative>
      <NTooltip :id="tooltipId(storeKey)">{{ name }}</NTooltip>

      <!-- Button -->
      <list-item-btn v-if="(isMenuitem)" :class="[isVisible && ' pr-4']">
        <div w-6 h-6 :class="[icon || '', isMini ? 'mx-auto' : 'mx-2']" />
        <span v-show="!isMini" flex="1" text="left" whitespace="nowrap" max="w-prose">{{ name }}</span>
        <div v-show="!isMini" flex="2" w="[2rem]" :class="[chevron]" />

      </list-item-btn>

      <!-- List -->
      <ul v-if="$slots.list" role="list" empty="hidden invisible" space="y-0" bg="light-900 dark:gray-700" w="full"
        :hidden="isVisible">
        <slot name="list" />
      </ul>

      <!-- Link -->
      <nuxt-link v-if="getRoutes().some(({ path }) => path === props.link || path === props.href) || isMenuitem"
        :to="link || href" :active-class="active" exact :external="external" class="w-full" :class="[linkClass]"
        :role="isMenuitem ? 'menuitem' : 'link'" :aria-current="isMenuitem ? '' : 'page'">
        <div v-if="$slots.icon" inline="flex" items="center">
          <slot name="icon" />
        </div>
        <list-item-btn v-if="(!isMenuitem && $slots.list)" :links-key="`${name}-sub-tooltip`">
          <div w-6 h-6 :class="[icon || '', isMini ? 'mx-auto' : 'mx-2']" />
          <span v-show="!isMini" flex="1" text="left" whitespace="nowrap" max="w-prose">{{ name }}</span>
        </list-item-btn>
        <div v-else>
          <slot></slot>
          <NTooltip :id="tooltipId(name)">{{ name }}</NTooltip>
        </div>
      </nuxt-link>
      <div v-else>
        <div w="full" font="bold" text="blue">
          {{ props.href || props.link }}
        </div>
        <div font="italic" text="sm">
=======
      <li :key="storeKey" :links-key="storeKey" :data-tooltip-target="tooltipId(name)"
        :data-tooltip-placement="tooltipPlacement || 'right'" relative>
        <NTooltip :id="tooltipId(storeKey)">{{ name }}</NTooltip>

        <!-- Button -->
        <list-item-btn v-if="(isMenuitem)" :class="[isVisible && ' pr-4']">
          <div w-6 h-6 :class="[icon || '', isMini ? 'mx-auto' : 'mx-2']" />
          <span v-show="!isMini" flex="1" text="left" whitespace="nowrap" max="w-prose">{{ name }}</span>
          <div v-show="!isMini" flex="2" w="[2rem]" :class="[chevron]" />

        </list-item-btn>

        <!-- List -->
        <ul v-if="$slots.list" role="list" empty="hidden invisible" space="y-0" bg="light-900 dark:gray-700" w="full"
          :hidden="isVisible">
          <slot name="list" />
        </ul>

        <!-- Link -->
        <nuxt-link v-if="getRoutes().some(({ path }) => path === props.link || path === props.href) || isMenuitem"
          :to="link || href" :active-class="active" exact :external="external" class="w-full" :class="[linkClass]"
          :role="isMenuitem ? 'menuitem' : 'link'" :aria-current="isMenuitem ? '' : 'page'">
          <div v-if="$slots.icon" inline="flex" items="center">
            <slot name="icon" />
          </div>
          <list-item-btn v-if="(!isMenuitem && $slots.list)" :links-key="`${name}-sub-tooltip`">
            <div w-6 h-6 :class="[icon || '', isMini ? 'mx-auto' : 'mx-2']" />
            <span v-show="!isMini" flex="1" text="left" whitespace="nowrap" max="w-prose">{{ name }}</span>
          </list-item-btn>
          <div v-else>
            <slot></slot>
            <NTooltip :id="tooltipId(name)">{{ name }}</NTooltip>
          </div>
    </nuxt-link>
    <div v-else>
      <div w="full" font="bold" text="blue">
        {{ props.href || props.link }}
      </div>
      <div font="italic" text="sm">
>>>>>>> f5706a3247861dfc68df5f8e6d220a3792543abe
        {{ (href || link) && !isMenuitem
          ? `ADD PAGE AS NAME AS ${(href || link || '').replace(/\//g, '')}.vue`
          : `ADD ROUTE TO <NuxtLink :to="${href || link}"></NuxtLink>`
        }}
      </div>
    </div>
  </li>
</template>
