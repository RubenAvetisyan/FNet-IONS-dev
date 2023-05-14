<script setup lang="ts">
import { format, parseISO } from 'date-fns';
import { withDefaults } from 'vue';

const emit = defineEmits(['update:modelValue', 'change'])

interface TableProps {
  headers: string[];
  body: (string | number | Record<string, { text: string }>)[][];
  name?: string;
  dateAs?: string | Date;
  grouping?: boolean;
  exactSearch: string[] | boolean
}

const props = withDefaults(defineProps<TableProps>(), {
  headers: () => [],
  body: () => [],
  name: 'Table',
  dateAs: format(Date.now(), 'ss-MM-yyyy'),
  grouping: false,
  exactSearch: false
})

const dateAs = computed(() => {
  try {
    const date = props.dateAs || Date.now()

    return typeof date !== 'string' ? format(date, 'ss-MM-yyyy') : format(parseISO(date), 'ss-MM-yyyy')
  } catch (error: any) {
    createError(error)
    return format(Date.now(), 'ss-MM-yyyy')
  }
})

const body = computed(() => props.body)

const showCaption = ref(true)

const searchQuery = ref<string>('')

const filters = ref<Record<number, string>>({})
const filteredData = computed(() => {
  return props.body.filter(row => {
    return Object.entries(filters.value).every(([colIndex, searchQuery]) => {
      const exactSearchEnabled = Array.isArray(props.exactSearch)
        ? props.exactSearch.includes(props.headers[colIndex])
        : props.exactSearch;

      if (exactSearchEnabled) {
        return row[parseInt(colIndex)]?.toString() === searchQuery;
      }

      return !searchQuery || row[parseInt(colIndex)]?.toString().toLowerCase().includes(searchQuery.toLowerCase());
    })
  })
})

const onSearch = (event: Event, colIndex: number) => {
  searchQuery.value = (event.target as HTMLInputElement).value.toLowerCase()
  filters.value[colIndex] = searchQuery.value
  emit('update:modelValue', filters.value)
}

const resetSearch = () => {
  searchQuery.value = '';
  filters.value = {}
}

const groupColumnIndex = ref<number | null>(null)

const groupedData = computed(() => {
  const grouped: Record<string | number, typeof body.value[number][]> = {}
  if (groupColumnIndex.value === null) return grouped

  props.body.forEach(row => {
    if (groupColumnIndex.value !== null) {
      const key = row[groupColumnIndex.value]?.toString()

      if (!grouped[key]) {
        grouped[key] = []
      }
      grouped[key].push(row)
    }
  })

  return grouped
})

const toggleGroupColumn = (colIndex: number) => {
  groupColumnIndex.value = groupColumnIndex.value === colIndex ? null : colIndex
}
</script>

<template>
          <ion-content class="ion-margin" disabled:opacity-75 border-separate bg-gray-3 w-pros h-full overflow-hidden font-300
            text-gray-500 text-dark:gray-400 relative>
            <!-- <ion-grid v-show="showCaption"
        class="w-full py-2 px-4 font-semibold text-lg left gray-900 dark:white bg-white dark:gray-800 justify-between">
        <ion-row>
          <ion-col size="auto">
            <slot v-if="$slots.caption" name="caption"></slot>
            <p>{{ `${name || $route.name} տեղեկագիր՝ առ ${dateAs}` }}</p>
          </ion-col>
          <ion-col class="w-full max-prose mt-1" size="auto">
            <span class="text-sm gray-500 dark:gray-400 code font-normal">Արտահանումը՝ *.xlsx ֆորմատով</span>
            <slot v-if="$slots.save" name="save"></slot>
            <SaveXlsx v-if="!$slots.save" :header="[]" :body="[]" float-right />
          </ion-col>
        </ion-row>
      </ion-grid> -->

            <ion-grid>
              <ion-row color="medium" class="ion-text-center ion-align-items-center">
                <ion-col v-for="(header, index) in headers" :key="index" class="ion-no-padding">
                  <ion-button fill="clear" @click="toggleGroupColumn(index)">{{ header }}</ion-button>
                  <ion-searchbar @input="onSearch($event, index)" debounce="500" />
                </ion-col>
              </ion-row>
              <template v-if="groupColumnIndex !== null && groupColumnIndex !== undefined" && grouping>
                <template v-for="(group, groupKey) in groupedData">
                  <ion-row color="primary" class="group-header" border bb-1>
                    <ion-col class="group-title">{{ groupKey }}</ion-col>
                  </ion-row>
                  <ion-row class="ion-text-center ion-align-items-center" v-for="(row, rowIndex) in group" :key="rowIndex" border
                    bb-1>
                    <ion-col v-for="(value, colIndex) in row" :key="colIndex">
                      {{ value }}
                    </ion-col>
                  </ion-row>
                </template>
              </template>
              <template v-else>
                <ion-row class="ion-text-center ion-align-items-center" v-for="(row, rowIndex) in filteredData" :key="rowIndex"
                  even:bg-indigo-100 even:dark:bg-gray-800 odd:dark:bg-gray-700 hover:text-dark-700 dark:hover:text-white b-1>
                  <ion-col v-for="(value, colIndex) in row" :key="colIndex">
                    {{ value }}
                  </ion-col>
                </ion-row>
              </template>


            </ion-grid>
            <ion-footer sticky bottom-0 flex flex-row w-full h-12 justify-between items-center pt-1 bg-gray-200 dark:bg-gray-700>
              <ion-button id="hover-trigger" @click="resetSearch">Չեղարկել</ion-button>
              <ion-popover trigger="hover-trigger" trigger-action="context-menu" alignment="center" :dismiss-on-select="true">
                <ion-content class="ion-padding">Չեղարկել փնտրման պարամատրերը</ion-content>
              </ion-popover>
              <slot name="footer"></slot>
            </ion-footer>
          </ion-content>
</template>
