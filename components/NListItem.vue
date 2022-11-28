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
})

const { getRoutes } = useRouter()

const active = 'block pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white'
const passive = 'block pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
const dClass = 'block text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
const linkClass = ref(props.isMenuitem ? dClass : passive)

const isVisible = ref(false)

const hidden = computed(() => isVisible.value ? '' : 'hidden')
const chevron = computed(() => isVisible.value ? 'i-mdi-chevron-up' : 'i-mdi-chevron-down')

const expand = () => {
  isVisible.value = !isVisible.value
}
</script>

<template>
  <li>
    <nuxt-link
      v-if="getRoutes().some(({ path }) => path === props.link || path === props.href) || isMenuitem"
      :to="link || href" :active-class="active" :exact="exact" :external="external" :class="linkClass"
      :role="isMenuitem ? 'menuitem' : 'link'" :aria-current="isMenuitem ? '' : 'page'" @click="expand"
    >
      <div v-if="$slots.icon" class="inline-flex items-center">
        <slot name="icon" />
      </div>
      <slot />

      <ul v-if="$slots.list" v-show="isVisible" class="space-y-0" :class="[hidden]">
        <slot name="list" />
      </ul>
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
