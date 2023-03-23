<script setup lang="ts">
import { H3Error } from 'h3';
import { AsyncComponentLoader } from 'vue';

interface CreateComponentsParams {
  componentName: string;
  id: string;
  label?: string;
  selected?: boolean;
  [key: string]: any;
  children?: CreateComponentsParams[]
}

interface CreateComponentsReturn<T> {
  data: any;
  component: Component<T>;
  children: any;
}

const createComponents = <T extends Component>(component: CreateComponentsParams, baseDir: string): CreateComponentsReturn<T> => {
  const { componentName, children = [] } = component
  const componentPath = baseDir ? `${baseDir}/${componentName}.vue` : `./components/${componentName}.vue`

  return {
    data: component,
    component: defineAsyncComponent<T>(async () => {
      return await import(componentPath)
    }),
    children: children.map(child => createComponents(child, baseDir))
  }
}

interface Tab {
  tab: {
    component: CreateComponentsReturn<Component>
    components: {
      component: CreateComponentsReturn<Component>
    }[]
  }
}

type Tabs = Tab[]

const result = ref<Tabs>([])

const { $isLoading, $finishLoading, $startLoading } = useNuxtApp()

const getTotals = async () => {
  if ($isLoading.value) return

  $startLoading()

  const { data, pending, error, refresh } = await useFetch('/api/get-totals-abilling'
    //   {
    //   query: {
    //     status
    //   }
    // }
  )

  const values = data.value

  if (values instanceof H3Error) return

  const [all, active, passive] = Array.isArray(values) ? values.map(({ body }) => body.length) : []

  const customerCounts = {
    tab: {
      component: createComponents({
        componentName: 'TabContent',
        id: 'totalcustomers',
        label: 'Բաժանորդների քանակ',
        selected: true
      }, '../../../components'),
      components: [{
        component: createComponents({
          componentName: 'FTable',
          id: 'total-customers-table',
          name: '',
          src: {
            header: ['Ակտիվ', 'Պասիվ', 'Ընդամենը'],
            body: [[active, passive, all]]
          }
        }, '../../../components')
      }]
    }
  }

  const payments = {
    tab: {
      component: createComponents({
        componentName: 'TabContent',
        id: 'totalcustomerpayments',
        label: 'Վճարված գումարներ'
      }, '../../../components'),
      components: [
        {
          component: createComponents({
            componentName: 'FTable',
            id: 'total-customers-payments-table',
            name: 'Վճարումների',
            src: {
              header: ['Ակտիվ', 'Պասիվ', 'Ընդամենը'],
              body: [[0, 0, 0]]
            }
          }, '../../../components')
        }
      ]
    }
  }

  result.value = [customerCounts, payments]
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
  <div v-if="result.length" py-4 px-8>
    <Tab id="totals">
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
        <component v-for="({ tab }) in result" :key="tab.component.data.id" :is="tab.component.component"
          v-bind="tab.component.data" mx-2>
          <template v-if="tab.components.length">
            <component v-for="({ component }) in tab.components" :key="component.data.id" :is="component.component"
              v-bind="component.data" mx-2>
              <template v-if="component.children">
                <component v-for="({ childComponent }) in component.children.components" :key="childComponent.data.id"
                  :is="childComponent.component" v-bind="childComponent.data" mx-2 />
              </template>
            </component>
          </template>
        </component>
      </template>
    </Tab>
  </div>
</template>
