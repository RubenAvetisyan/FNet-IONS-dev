<template>
  <div role="tooltip" bg-gray-900 dark:bg-gray-700
    class="absolute z-100 invisible inline-block px-3 py-2 text-sm font-medium text-white rounded-lg shadow-sm opacity-0 tooltip">
    <slot />
    <div class="tooltip-arrow bg-blue-300" data-popper-arrow></div>
  </div>
</template>
