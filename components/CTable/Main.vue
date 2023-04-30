<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { useVirtualList } from '@vueuse/core'
import { format, parseISO } from 'date-fns';

const props = defineProps<{
  header: string[];
  body: (string | number | Record<string, { text: string }>)[][];
  name?: string;
  dateAs?: string | Date
}>()

const body = computed(() => props.body)

const dateAs = computed(() => {
  try {
    const date = props.dateAs || Date.now()

    return typeof date !== 'string' ? format(date, 'ss-MM-yyyy') : format(parseISO(date), 'ss-MM-yyyy')
  } catch (error: any) {
    createError(error)
    return format(Date.now(), 'ss-MM-yyyy')
  }
})

const { list, containerProps, wrapperProps } = useVirtualList(unref(body), {
  itemHeight: 80,
  overscan: 5
})

const showCaption = ref(true)

const normalize = (rows: Ref<{
  index: number;
  data: any;
}[]> | {
  index: number;
  data: any;
}[]) => unref(rows)
</script>

<template>
  <div disabled:opacity-75 border-separate bg-gray-3 w-pros h-full overflow-hidden font-300 text-gray-500
    text-dark:gray-400 relative>
    <div v-show="showCaption" w-full py-2 px-4 font-semibold text="lg left gray-900 dark:white" bg="white dark:gray-800"
      justify="between">
      <slot v-if="$slots.caption" name="caption"></slot>
      <p>{{ `${name || $route.name} տեղեկագիր՝ առ ${dateAs}` }}</p>
      <div w="full max-prose" mt-1>
        <span text="sm gray-500 dark:gray-400 code" font-normal>Արտահանումը՝ *.xlsx ֆորմատով</span>
        <slot v-if="$slots.save" name="save"></slot>
        <!-- <SaveXlsx v-if="!$slots.save" :header="xlsxHeader" :body="xlsxBody" float-right /> -->
      </div>
    </div>
    <div v-show="!showCaption"></div>
    <LazyTableHeader>
      <slot name="head" :headers="(header as string[])"></slot>
    </LazyTableHeader>
    <slot name="body">
      <LazyTableBody :src="{ list, wrapperProps, containerProps }">
        <template #default="{ props }">
          <lazy-c-table-body-tr v-for="(item, i) in normalize(props)" :key="`tr-${item.index || i}`" class="h-[80px]">
            <lazy-c-table-body-td v-for="(column, ci) in item.data" :key="column + '-' + ci" :class="{
                'font-medium hover:select-all border-r border-indigo-100 dark:border-indigo-500 dark:bg-indigo-600 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center': ci === 0,
                'font-light select-none hover:select-all': ci,
              }" hover="bg-indigo-400 text-indigo-700" pointer-events-auto>
              <span text-sm>{{ column }}</span>
            </lazy-c-table-body-td>
          </lazy-c-table-body-tr>
        </template>
      </LazyTableBody>
    </slot>
    <div sticky bottom-0 flex flex-row w-full h-12 justify-between items-center pt-1 bg-gray-200 dark:bg-gray-700>
      <slot name="footer"></slot>
    </div>
  </div>
</template>
