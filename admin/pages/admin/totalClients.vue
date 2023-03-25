<script setup lang="ts">
import { H3Error } from 'h3';

definePageMeta({
  requiresAuth: true,
  layout: 'admin',
})

interface CreateComponentsParams {
  componentName: string;
  id: string;
  label?: string;
  selected?: boolean;
  [key: string]: any;
  children?: CreateComponentsParams[]
}

interface CreateComponentsReturn {
  data: any;
  component: any;
  children: any;
}

const createComponents = async (component: CreateComponentsParams, baseDir: string): Promise<CreateComponentsReturn> => {
  const { componentName, children = [] } = component
  const componentPath = baseDir ? `${baseDir}/${componentName}.vue` : `./components/${componentName}.vue`
  const myComponent = await import(componentPath)

  return {
    data: component,
    component: defineAsyncComponent(async () => await import(/* @vite-ignore */componentPath)),
    children: children.map(child => createComponents(child, baseDir))
  }
}

interface Tab {
  tab: {
    component: CreateComponentsReturn
    components: {
      component: CreateComponentsReturn
    }[]
  }
}

type Tabs = Tab[]

const result = shallowRef<Tabs>([])

const { $isLoading, $finishLoading, $startLoading } = useNuxtApp()

const getTotals = async () => {
  if ($isLoading.value) return

  $startLoading()

  const fetchSub = async (endpoint: string) => await useFetch(endpoint)

  const { data, pending, error, refresh } = await useFetch('/api/get-totals-abilling'
    //   {
    //   query: {
    //     status
    //   }
    // }
  )


  if (data.value instanceof H3Error) return

  const values: { header: string[], body: { [key: string]: string }[] }[] = Array.isArray(data.value) ? data.value : []
  console.log('values: ', values[1].body[7]);

  const [all, active, passive, paymentsAll, paymentsActive, paymentsPassive] = values.map(({ body }) => body.length)
  const paymentsAllSum = values[3].body.reduce((previous, current) => {
    return previous + parseInt(current.summa)
  }, 0)
  const paymentsActiveSum = values[4].body.reduce((previous, current) => {
    return previous + parseInt(current.summa)
  }, 0)
  const paymentsPassiveSum = values[5].body.reduce((previous, current) => {
    return previous + parseInt(current.summa)
  }, 0)
  console.log('paymentsAll: ', paymentsAllSum);
  console.log('paymentsActive: ', paymentsActiveSum);
  console.log('paymentsPassive: ', paymentsPassiveSum);

  const customerCounts = async () => {
    const showCustomersSub = ref(false)
    const subSrc = ref(values.slice(0, 3))
    const arrNum = ref(0)
    const src = computed(() => {
      return subSrc.value.length ? subSrc.value[arrNum.value] : {
        header: [],
        body: []
      }
    })
    const fn = (number: number) => () => {
      if (number === arrNum.value) {
        showCustomersSub.value = !showCustomersSub.value
      }
      arrNum.value = number
    }
    return {
      tab: {
        component: await createComponents({
          componentName: 'TabContent',
          id: 'totalcustomers',
          label: 'Բաժանորդների քանակ',
          selected: true
        }, '../../../components'),
        components: [{
          component: await createComponents({
            componentName: 'FTable',
            id: 'total-customers-table',
            name: '',
            src: {
              header: ['Ակտիվ', 'Պասիվ', 'Ընդամենը'],
              body: [[{ fn: fn(1), text: active }, { fn: fn(2), text: passive }, { fn: fn(0), text: all }]]
            },
            dynamicSlot: {
              class: 'bg-transparent',
              name: 'info',
              show: showCustomersSub,
              src
            }
          }, '../../../components')
        }]
      }
    }
  }

  const payments = async () => {
    const showPaymentsSub = ref(false)
    const subSrc = ref(values.slice(4, 6))
    const arrNum = ref(0)
    const src = computed(() => {
      return subSrc.value.length ? subSrc.value[arrNum.value] : {
        header: [],
        body: []
      }
    })
    const fn = (number: number) => () => {
      console.log('number === arrNum.value: ', number === arrNum.value);
      if (number === arrNum.value) {
        showPaymentsSub.value = !showPaymentsSub.value
      }
      arrNum.value = number
    }
    return {
      tab: {
        component: await createComponents({
          componentName: 'TabContent',
          id: 'totalcustomerpayments',
          label: 'Վճարված գումարներ'
        }, '../../../components'),
        components: [
          {
            component: await createComponents({
              componentName: 'FTable',
              id: 'total-customers-payments-table',
              name: 'Վճարումների',
              src: {
                header: ['Ակտիվ', 'Պասիվ', 'Ընդամենը'],
                body: [[
                  { fn: fn(4), text: `${paymentsActive} - ${paymentsActiveSum}` },
                  { fn: fn(5), text: `${paymentsPassive} - ${paymentsPassiveSum}` },
                  { fn: fn(3), text: `${paymentsAll} - ${paymentsAllSum}` }
                ]]
              },
              dynamicSlot: {
                class: 'bg-transparent',
                name: 'info',
                show: showPaymentsSub,
                src
              }
            }, '../../../components')
          }
        ]
      }
    }
  }

  result.value = await Promise.all([customerCounts(), payments()])
  console.log('result: ', result.value);
  console.log('data.value: ', data.value);

  $finishLoading()

  return { refresh, pending, error }
}

const refreshData = ref()

onMounted(() => {
  if (refreshData.value) {
    refreshData.value()
  } else {
    nextTick(() => getTotals())
  }
})
</script>

          
<template>
      <div v-if="result.length" py-4 px-0>
        <Tab id="totals" px-0 mx-0>
          <template #default>
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Խնդրում ենք նույնականացվել համակարգում
            </h3>
          </template>

          <template #head>
            <TabHead v-for="({ tab }, i) in result" :key="tab.component.data.id">
              {{ tab.component.data.label }}
            </TabHead>
          </template>

          <template #list>
            <TabLi v-for="({ tab }) in result" :key="tab.component?.data.id" :id="tab.component.data.id"
              :selected="tab.component.data?.selected">
              {{ tab.component.data.label }}
            </TabLi>
          </template>

          <template #content>
            <Suspense>
              <component v-for="({ tab }) in result" :key="tab.component.data.id" :is="tab.component.component"
                v-bind="tab.component.data" px-0 mx-0>
                <template v-if="tab.components.length">
                  <component v-for="({ component }) in tab.components" :key="component.data.id" :is="component.component"
                    v-bind="component.data" mx-2>
                    <FTable v-show="component.data.dynamicSlot.show.value" :src="component.data.dynamicSlot.src.value" shadow-none
                      text-blue />
                  </component>
                </template>
              </component>
            </Suspense>
      </template>
    </Tab>
  </div>
</template>
