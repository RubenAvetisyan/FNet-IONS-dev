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

const active = 'block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white'
const passive = 'block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
const dClass = 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'
const linkClass = ref(unref(props.isMenuitem) ? dClass : passive)

const isVisible = ref(false)

const hidden = computed(() => isVisible.value ? '' : 'hidden')
const chevron = computed(() => isVisible.value ? '' : 'mdi-chevron-down')

const expand = () => {
  isVisible.value = !isVisible.value

  console.log('hidden: ', hidden)
}
</script>

<template>
  <li>
    <nuxt-link
      :to="link || href" :active-class="active" :exact="exact" :external="external" :class="linkClass"
      :role="isMenuitem ? 'menuitem' : ''" :aria-current="isMenuitem ? '' : 'page'" @click="expand"
    >
      <div v-if="$slots.icon" class="inline-flex items-center">
        <slot name="icon" />
      </div>
      <slot />

      <ul v-if="$slots.list" v-show="isVisible" class="space-y-0" :class="[hidden]">
        <slot name="list" />
      </ul>
    </nuxt-link>
  </li>
</template>
