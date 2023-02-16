<template>
  <card>
    <div w-full>
      <span
        v-if="$slots.head" bg="purple-100 dark:purple-200" text="lg purple-800 dark:purple-800" font="semibold"
        m="r-2 l-2" p="x-2.5 y-0.5" rounded
      >
        <slot name="head" />
      </span>
    </div>

    <div
      v-if="$slots.default" text-lg text-transparent m-2 bg-clip-text
      class="bg-gradient-to-r to-indigo-500 from-purple-500"
    >
      <slot />
    </div>

    <div v-if="$slots.full" w-full h-full>
      <slot name="full" />
    </div>

    <template #bottom>
      <div w-full>
        <slot name="bottom" />

        <div flex float="right" items-center relative>
          <slot name="bottom-right" />
        </div>
      </div>
    </template>
  </card>
</template>
