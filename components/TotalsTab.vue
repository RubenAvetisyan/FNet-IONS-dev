<template>
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
              <FTable v-show="component.data.dynamicSlot.show.value" :src="component.data.dynamicSlot.src.value"
                shadow-none text-blue />
            </component>
          </template>
        </component>
      </Suspense>
    </template>
  </Tab>
</template>
