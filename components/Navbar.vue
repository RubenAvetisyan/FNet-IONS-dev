<script setup>
// const items = markRaw([
//   { lang: 'English (US)1', icon: resolveComponent('SvgEnIcon') },
//   { lang: 'Deutsch', icon: resolveComponent('SvgDeIcon') },
//   { lang: 'Italiano', icon: resolveComponent('SvgItIcon') },
//   { lang: '中文 (繁體)', icon: resolveComponent('SvgChIcon') },
// ])
</script>

<template>
  <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
    <div class="container flex flex-wrap items-center justify-between mx-auto">
      <LogoButton v-if="!$slots.logo" class="flex items-center" />
      <slot v-else name="logo" />
            <!-- <FDropDown :items="items" menu-item-key="lang">
            </FDropDown> -->
            <div v-if="$slots.extra" class="flex items-center md:order-2 z-{100000}">
              <slot name="extra" />
            </div>
            <div id="mobile-menu-language-select"
              class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
              <ul v-if="$slots.listItems"
                class="flex flex-col p-4 mt-4 border align-middle items-center border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <slot name="listItems" />
        </ul>
      </div>
    </div>
  </nav>
</template>
