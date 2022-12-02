<script setup>
import { computed } from '@vue/reactivity'

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
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  isMini: {
    type: Boolean,
    default: false
  }
})

const { getRoutes } = useRouter()

const active = 'block pr-4 text-white bg-[#5723ae] rounded md:bg-transparent md:text-[#e30083] md:p-0 dark:text-white'
const passive = 'block pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#e30083] md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
const dClass = 'block text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
const linkClass = ref(props.isMenuitem ? dClass : passive)

const isVisible = ref(false)

const isHidden = computed(() => isVisible.value ? '' : 'hidden')
const chevron = computed(() => isVisible.value ? 'i-mdi-chevron-up' : 'i-mdi-chevron-down')

const expand = () => {
  isVisible.value = !isVisible.value
}
</script>

<template>
  <li>
    <!-- Button -->
    <div v-if="(isMenuitem)" h-12
      class="flex-0 pr-4 hover:bg-[#5723ae] select-none items-center w-full text-base font-normal text-gray-900 hover:text-light transition duration-75 group dark:text-white"
      :class="[
                                (isVisible && 'flex inline-flex'),
                                (!isVisible && 'flex items-center justify-center'),
                              ]" @click="expand">
      <div w-6 h-6 :class="[icon || '', isMini ? 'mx-auto' : 'mx-2']" />
      <span v-show="!isMini" class="flex-1 text-left whitespace-nowrap max-w-prose">{{ name }}</span>
      <div v-show="!isMini" :class="[chevron, 'flex-2 w-[2rem]']" />
    </div>
    
    <!-- List -->
    <ul v-if="$slots.list" v-show="isVisible" class="space-y-0" :class="[isHidden, 'w-full']">
      <slot name="list" />
    </ul>
    
    <!-- Link -->
    <nuxt-link v-if="getRoutes().some(({ path }) => path === props.link || path === props.href) || isMenuitem"
      :to="link || href" :active-class="active" :exact="exact" :external="external" :class="[linkClass, 'w-full']"
      :role="isMenuitem ? 'menuitem' : 'link'" :aria-current="isMenuitem ? '' : 'page'">
      <div v-if="$slots.icon" class="inline-flex items-center">
        <slot name="icon" />
      </div>
    
      <div v-if="(!isMenuitem && $slots.list)" h-12
        class="flex-0 pr-4 hover:bg-[#5723ae] select-none items-center w-full text-base font-normal text-gray-900 hover:text-light transition duration-75 group dark:text-white"
        :class="[
                                  (isVisible && 'flex inline-flex'),
                                  (!isVisible && 'flex items-center justify-center'),
                                ]">
        <div w-6 h-6 :class="[icon || '', isMini ? 'mx-auto' : 'mx-2']" />
        <span v-show="!isMini" class="flex-1 text-left whitespace-nowrap max-w-prose">{{ name }}</span>
      </div>
    
      <slot v-else></slot>
    
    </nuxt-link>
    <div v-else>
      <div class="w-full text-blue font-bold">
        {{ props.href || props.link }}
      </div>
      <div class="text-sm font-italic">
        {{ (href || link) && !isMenuitem
        ? `ADD PAGE AS NAME AS ${(href || link || '').replace(/\//g, '')}.vue`
        : `ADD ROUTE TO <NuxtLink :to="${href || link}"></NuxtLink>`
        }}
      </div>
    </div>
  </li>
</template>
