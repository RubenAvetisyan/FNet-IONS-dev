<template>
    <card>
        <span v-if="$slots.head" bg="purple-100 dark:purple-200" text="lg purple-800 dark:purple-800" font="semibold"
            m="r-2 l-2" p="x-2.5 y-0.5" rounded>
            <slot name="head"></slot>
        </span>
        <p class="text-lg text-transparent m-2 bg-clip-text bg-gradient-to-r to-indigo-500 from-purple-500">
            <slot></slot>
        </p>

        <div v-if="$slots.full" w-full h-full>
            <slot name="full"></slot>
        </div>

        <slot name="bottom"></slot>

        <div flex float="right" items-center relative>
            <slot name="bottom-right"></slot>
        </div>
    </card>
</template>