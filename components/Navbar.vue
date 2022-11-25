<script setup>
const items = markRaw([
  { lang: 'English (US)', icon: resolveComponent('SvgEnIcon') },
  { lang: 'Deutsch', icon: resolveComponent('SvgDeIcon') },
  { lang: 'Italiano', icon: resolveComponent('SvgItIcon') },
  { lang: '中文 (繁體)', icon: resolveComponent('SvgChIcon') },
])
</script>

<template>
  <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
    <div class="container flex flex-wrap items-center justify-between mx-auto">
      <LogoButton v-if="!$slots.logo" class="flex items-center" />
      <slot v-else name="logo" />
      <div class="flex items-center md:order-2">
        <dropdown-button>
          <svg-en-b-icon />
          <span class="sr-only sm:not-sr-only">English (US)</span>
        </dropdown-button>
        <!-- Dropdown -->
        <dropdown-menu>
          <n-list-item v-for="item in items" :key="item.lang">
            <template #icon>
              <component :is="item.icon" />
            </template>
            {{ item.lang }}
          </n-list-item>
        </dropdown-menu>
        <MobileHeaderButton />
        <div v-if="$slots.extra" class="flex items-center md:order-2 z-{100000}">
          <slot name="extra" />
        </div>
      </div>
      <div id="mobile-menu-language-select" class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
        <ul
          v-if="$slots.listItems"
          class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <slot name="listItems" />
        </ul>
      </div>
    </div>
  </nav>
</template>
