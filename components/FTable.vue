<script setup>
import drop from 'lodash.drop'
import sordby from 'lodash.sortby'
import reverse from 'lodash.reverse'
import _filter from 'lodash.filter'
import _includes from 'lodash.includes'
import zipobject from 'lodash.zipobject'
import intersection from 'lodash.intersection'
import { format } from 'date-fns'
const props = defineProps({
  name: {
    type: [Object, String],
    default: ''
  },
  src: {
    type: Object,
    reqired: true,
  },
  rows: {
    type: [Number, String],
    default: 12,
  },
  saveAsFilename: {
    type: [String, Function],
    default: ''
  },
  filters: {
    type: Array,
    default: ['']
  },
  footer: true
})

const today = format(Date.now(), 'dd/MM/yyyy')

const columns = ref([])
const columnValue = ref([...props.filters])
const colIndex = ref(0)
const isMin = ref(false)

const setColums = (headers, body) => {
  if (!Array.isArray(headers)) {
    console.log('headers: ', headers);
    Object.keys(h).map((key, i) => {
      columns.value.push(sordby(intersection(body.map(item => item[key] || item[i]))))
    })
  } else {
    headers.forEach((header, i) => {
      columns.value.push(sordby(intersection(body.map(item => item[header] || item[i]))))
    })
  }


}

onMounted(() => {
  columns.value = []
  setColums(props.src.header, props.src.body)
  // columnValue.value = columns.value.map(s => '')
})

onActivated(() => {
  columns.value = []
  setColums(props.src.header, props.src.body)
  // columnValue.value = columns.value.map(s => '')
})

const sortFromMin = items => sordby(items, (nestedArray) => {
  return nestedArray[colIndex.value]
})

const sortFromMax = items => reverse(sortFromMin(items))

const filteredArray = (array, cols) => _filter(array, (item) => {
  return cols.length ? cols.every(v => _includes(item, +v) || _includes(item, v)) : true
})

function getPaginatedItems(items, page, pageSize = 0, fromMinimum, filters) {
  const cols = filters.filter(s => s)
  let pagedItems = filteredArray(items.text || items, cols)

  columns.value = []
  setColums(props.src.header, pagedItems)

  pagedItems = fromMinimum ? sortFromMin(pagedItems) : sortFromMax(pagedItems)
  const pg = page || 1
  const pgSize = pageSize > pagedItems.length ? pagedItems.length : pageSize
  const offset = (pg - 1) * pgSize
  const pageItems = drop(pagedItems, offset).slice(0, pgSize)

  return {
    page: pg,
    pageSize: pgSize,
    total: pagedItems.length,
    total_pages: Math.ceil(pagedItems.length / pgSize),
    data: pageItems,
    filteredArray: pagedItems,
  }
}

const page = ref(1)

const columnFilter = (header) => {
  const index = props.src.header.indexOf(header)
  isMin.value = colIndex.value === index ? !isMin.value : false
  colIndex.value = index
  return index
}

const fn = i => (v) => {
  columnValue.value[i] = v.target.value
  // columnValue.value = columnValue.value.filter(v => v)
}

const filters = computed(() => columnValue.value.filter(s => s))
const body = computed(() => {

  return getPaginatedItems(props.src.body, page.value, props.rows, isMin.value, filters.value)
})

// watch(() => columnValue.value, val => {
//   getPaginatedItems(props.src.body, page.value, props.rows, isMin.value, val)
// }, {
//   immediate: true,
//   deep: true
// })

const canBeEdited = ref(false)

const filename = computed(() => {
  if (typeof props.saveAsFilename === 'string') {
    return () => props.saveAsFilename
  }

  return () => {
    const params = getData()
    props.saveAsFilename(params)
  }
})

function getData() {
  return body.value.filteredArray.map((item) => {
    const result = {}
    props.src.header.forEach(header => {
      result[header] = item[header]
    })
    return result // zipobject(props.src.header, item)
  })
}

const xlsxHeader = computed(() => {
  return props.src.header.map(header => ({
    header,
    key: header,
    width: 20,
  }))
})

const xlsxBody = computed(() => {
  return body.value.filteredArray.map((item) => {
    const result = {}
    props.src.header.forEach(header => {
      result[header] = item[header]
    })
    return result // zipobject(props.src.header, item)
  })
})

const setXls = async () => {
  const data = getData()


  return await useFetch('/api/saveInoExcel', {
    method: 'POST',
    body: {
      data,
      headers: props.src.header.map(header => ({
        header,
        key: header,
        width: 20,
      })),
      filename: filename.value()
    },
  })
}

const chevronIsUp = (colIndex, i) => isMin.value & colIndex === i
const isObject = (v) => typeof v === 'object' && !Array.isArray(v)

const firstColumnClass = 'border-r border-indigo-100 dark:border-indigo-500 dark:bg-indigo-600 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center'
</script>

<template>
      <div :key="body.length" w="sm md:full" h="full" resize="y" overflow="x-hidden" shadow="md" rounded="sm:lg"
        scrollbar="~ track-color-gray-100 dark:track-color-gray-800 thumb-color-indigo-500 dark:thumb-color-indigo-800">
        <table class="disabled:opacity-75" w="full" text="sm left gray-500 dark:gray-400">
          <caption py-2 px-4 font-semibold text="lg left gray-900 dark:white" bg="white dark:gray-800" justify="between">
            <slot v-if="$slots.caption" name="caption">

            </slot>
            <p>{{ name && `${name} տեղեկագիր՝ առ ${today}` }}</p>
            <div w="full max-prose" mt-1>
              <span text="sm gray-500 dark:gray-400 code" font-normal>Արտահանումը՝ *.xlsx ֆորմատով</span>
                <slot name="save"></slot>
                <SaveXlsx v-if="!$slots.save" :header="xlsxHeader" :body="xlsxBody" float-right />
              </div>
            </caption>
            <thead sticky top-0 text="xs indigo-700 dark:gray-300 center" bg="gray-200 dark:indigo-700">
              <tr>
                <th v-for="(header, i) in src.header" :key="header" scope="col" p="x-3 y-3"
                  :class="{ ['cursor-pointer']: !!(header?.fn) }"
                  @click="event => header?.fn ? header?.fn(event, header) : null">
                  <FBtn v-if="isObject(header) && !header?.fn" v-bind="header.data" @click="header.click() || null">{{
                    header.text }}</FBtn>
                  <p v-else-if="columns[i]?.length <= 1">{{ header.text || header }}</p>
                  <FSelect v-else mx-0 w-full break-words text="sm left gray-400 dark:gray-100" :name="header" :options="{
                    labe: header,
                    values: columns[i],
                    selected: 0
                  }" :custom-fn="fn(i)" justify="between">
                    <Chevron aria-disabled="colIndex === i" :is-up="!!chevronIsUp(colIndex, i)" :active="colIndex === i"
                      rounded-1 dark:bg-indigo-50 text="sm left gray-100 dark:gray-800" @click="() => columnFilter(header)" />
                  </FSelect>
                </th>
                <th v-if="canBeEdited" scope="col" class="py-3 px-6">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <lazy-f-tr v-for="items in body.data" :key="items[0]" w-full>
                <td v-for="(item, i) in (typeof items === 'string' ? items.split(',') : items)"
                  :key="`${src.header[i]}-${item}`" scope="row" p="x-2 y-2" text="center"
                  :class="[i === 0 && firstColumnClass, { ['cursor-pointer']: !!(item?.fn) }]" select-none
                  hover="bg-indigo-400 text-indigo-700" hover:group:select-text @click="event => item?.fn(event, item)">
                  <!-- <NuxtLink v-if="(item?.link && typeof item !== 'string')" to="item.link">{{ item.text }}</NuxtLink> -->
                  <span>{{ (item?.text || item) }}</span>
                </td>
                <td v-if="canBeEdited" class="py-4 px-6 text-right"></td>
              </lazy-f-tr>
              <lazy-f-tr v-if="$slots.info">
                <td scope="row" colspan="3">
                  <div> px-1
                    <slot name="info"></slot>
                  </div>
                </td>
              </lazy-f-tr>
              <!-- <lazy-f-tr v-for="n of Array.from({ length: (body.pageSize - body.data.length) }, (v, i) => i)"
                                          :key="`added-${n}`" h-13>
                                          <td scope="row" h-13 border-r border-indigo-100 dark:border-indigo-500 dark:bg-indigo-600 font-medium
                                          text-gray-900 whitespace-nowrap dark:text-white text-center>
                                          </td>
                                          </lazy-f-tr> -->
          </tbody>
        </table>
        <nav v-if="footer" :key="`${body.length}-pagitation`" sticky bottom-0 flex w-full justify-between items-center pt-1
          bg-gray-200 dark:bg-gray-700 aria-label="Table navigation">
      <span ml-4 font-semibold text-gray-900 dark:text-white>{{ body.total }} տողից՝
        <span text-sm font-normal text-gray-500 dark:text-gray-400>Ցուցադրված է
          <span font-semibold text-gray-900 dark:text-white>
            {{ (body.page - 1) * body.pageSize + 1 }}-{{ body.page * body.pageSize }} տողերը
          </span>
        </span>
      </span>
      <slot :body="body" />
      <ul v-if="body.total_pages > 1" snap-mandatory snap-x scroll-smooth relative max-w-120 inline-flex items-center
        overscroll="x-contain">
        <li cursor="pointer" block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300
          hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
          dark:hover:bg-gray-700 dark:hover:text-white @click="page > 0 ? page-- : page">
          <span sr-only>Previous</span>
          <div i-mdi-chevron-left w-5 h-5 />
        </li>
        <li v-for="num in body.total_pages" snap-always cursor="pointer" py-2 px-3 leading-tight text-gray-500 bg-white
          border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
          dark:hover:bg-gray-700 dark:hover:text-white :aria-current="num === body.page && 'page'"
          :class="num === body.page && 'border text-blue-600 bg-blue-50 border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white'"
          @click="page = num">
          {{ num }}
        </li>
        <li absolute right-0 cursor="pointer" block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border
          border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
          dark:hover:bg-gray-700 dark:hover:text-white @click="page < body.total_pages ? page++ : page">
          <span sr-only>Next</span>
          <div i-mdi-chevron-right w-5 h-5 />
        </li>
      </ul>
    </nav>
  </div>
</template>
