<script setup lang="ts">
const { setAlert } = useAlertStore()
const { login: storeLogin } = useAdminAuthStore()

const { signIn, getProviders } = useSession()

const provifers = ref(await getProviders())
console.log('provifers: ', provifers.value);

const mySignInHandler = () => async ({ username, password }: { username: string, password: string }) => {
  const { error, url } = await signIn('credentials', { username, password, redirect: true })
  console.log('url: ', url);
  if (error) {
    // Do your custom error handling here
    alert('You have made a terrible mistake while entering your credentials')
  } else {
    // No error, continue with the sign in, e.g., by following the returned redirect:
    return navigateTo(url, { external: false })
  }
}

// const login = async (disabled) => {
//   if (!username.value || password.value)
//     return createError('Ստուգեք լրացվող տվյալները')

//   disabled.value = true
//   const data = await mySignInHandler({ username: username.value, password: password.value })
//   console.log('data: ', data);
//   // await storeLogin(username, password, setAlert)

//   disabled.value = false
// }

const tabs = ref([{
  tab: {
    component: createComponents({
      componentName: 'TabContent',
      id: 'main',
      label: 'Հիմնական',
      selected: true
    }),
    components: [
      {
        component: createComponents({
          componentName: 'Form',
          id: 'main',
          submit: mySignInHandler
        })
      }
    ]
  }
},
{
  tab: {
    component: createComponents({
      componentName: 'TabContent',
      id: 'erp',
      label: 'ERP',
    }),
    components: [
      {
        component: createComponents({
          componentName: 'Form',
          id: 'erp',
          submit: mySignInHandler
        })
      }
    ]
  }
}])

function createComponents(component: { componentName: string, id: string;[key: string]: any }) {
  // split the data and the component instance so you can v-bind the data easier in the template
  const { componentName } = component
  return {
    data: component,
    // A note is that if you use path aliases for dynamic imports like @ or ~ you might experience issues.
    component: defineAsyncComponent(async () => await import(`../components/${componentName}.vue`)),
  }
}
</script>

<template>
    <div class="py-6 px-6 lg:px-8">
          <Tab>
            <template #default>
              <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Խնդրում ենք նույնականացվել համակարգում
              </h3>
            </template>

            <template #head>
              <TabHead v-for="({ tab }, i) in tabs" :key="tab.component.data.id">
                {{ tab.component.data.label }}
              </TabHead>
            </template>

            <template #list>
              <TabLi v-for="({ tab }) in tabs" :key="tab.component?.data.id" :id="tab.component.data.id"
                :selected="tab.component.data?.selected">
                {{ tab.component.data.label }}
              </TabLi>
            </template>

            <template #content>
              <component v-for="({ tab }) in tabs" :key="tab.component.data.id" :is="tab.component.component"
                v-bind="tab.component.data" mx-2>
                <template v-if="tab.components.length">
                  <component v-for="({ component }) in tab.components" :key="component.data.id" :is="component.component"
                    v-bind="component.data" mx-2 />
                </template>
              </component>
            </template>

          </Tab>
  </div>
</template>
