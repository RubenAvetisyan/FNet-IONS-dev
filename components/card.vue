<template>
  <div
    block h-max p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800
    dark:border-gray-700 dark:hover:bg-gray-700
  >
    <div w-full h-max>
      <slot />
    </div>

    <div v-if="$slots.bottom" flex h-max items-end>
      <slot name="bottom" />
    </div>
  </div>
</template>
