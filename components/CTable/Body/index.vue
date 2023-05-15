<script setup lang="ts">
import { StyleValue } from 'vue';
type Fn = () => void;

const props = defineProps<{
  src: {
    list: Ref<{ index: number, data: any }[]>;
    containerProps: {
      ref: Ref<HTMLElement | null>;
      onScroll: Fn;
      style: StyleValue;
    };
    wrapperProps: ComputedRef<{
      style: {
        width: string;
        height: string;
        marginTop: string;
      } | {
        width: string;
        height: string;
        marginLeft: string;
        display: string;
      };
    }>
  }
}>()

const src = computed(() => props.src)
console.log('src: ', src);
</script>
<template>
  <div v-bind="props.src.containerProps" appearance-none h-full
    scrollbar="~ track-color-gray-100 dark:track-color-gray-800 thumb-color-indigo-500 dark:thumb-color-indigo-800"
    resize-y>
      <div v-bind="src.wrapperProps" mx-auto>
        <slot :props="src.list.value"></slot>
    </div>
  </div>
</template>
