<script setup>
import { storeToRefs } from 'pinia'
import { initModals } from 'flowbite'

const isDesctop = ref(true)


console.log('desktop: ', isDesctop);

// initialize components based on data attribute selectors
onMounted(() => {
  nextTick(() => {
    initModals()
    isDesctop.value = getPlatforms().includes('desktop')
  })
})

const alertStore = useAlertStore()
const { isAlert, alertMsg } = storeToRefs(alertStore)
console.log('isAlert: ', isAlert.value);

const route = useRoute()
const { $isLoading } = useNuxtApp()

const isLoading = computed(() => $isLoading.value)

const msgs = computed(() => {
  console.log('alertMsg: ', alertMsg.value);
  return alertMsg || []
})

const links = ref([
  { name: 'Հիմանական էջ', link: '/' },
  // { name: 'Payment API', link: '/payment' },
  { name: 'Հաշվետվություններ', link: '/user/statements', tooltipText: 'Գործառնական հաշվետվություններ' },
  // { name: 'Pricing', link: '/user' },
  // { name: 'Contact', link: '/user' },
  { name: 'Հաշվիչ', link: '/calc' }
])

onErrorCaptured((err) => useToast(err.message || err, 'error'))

const handleRefresh = (event) => {
  setTimeout(() => {
    // Any calls to load data go here
    event.target.complete();
  }, 2000);
}
</script>

<template>
    <ion-app align="content-center" bg-white>
      <ion-page class="ion-padding-start" flex items-center>
        <Loading v-show="isLoading" />
        <ion-header class="ion-padding flex text-center items-center mb-1">
          <ion-toolbar>
            <ion-label slot="start">
              <LogoButton class="flex items-center" />
            </ion-label>
            <navbar v-if="isDesctop" flex mx-auto justify-space-between>
              <template #listItems>
                <n-list-item v-for="link in links" :key="link.name" :link="link.link" :exact="link?.exact"
                  :external="link.external" :tooltipText="link?.tooltipText" tooltipPlacement="bottom">
                  {{ link.name }}
                </n-list-item>
              </template>
            </navbar>

            <ion-grid v-else>
              <ion-title>{{ links.find(link => link.link === $route.path).name }}</ion-title>
            </ion-grid>
            <ion-label slot="end">
              <LoginButton v-if="route.path !== '/login'" />
            </ion-label>
          </ion-toolbar>
        </ion-header>
        <ion-content color="light dark:dark" :fullscreen="true" class="ion-padding" h-full items-center content-center
          text-center self-center px-10 w-full ion-justify-content-center>
          <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
            <ion-refresher-content></ion-refresher-content>
          </ion-refresher>

          <main class="text-center">
            <div container mx-auto mb-1>
              <slot />
            </div>
          </main>
          <ModalLoginForm>
            <Form />
          </ModalLoginForm>
        </ion-content>
        <ion-footer v-if="$slots.footer" color="medium" pos="bottom-0 fixed" align="items-center content-center">
          <slot name="footer" />
        </ion-footer>
      </ion-page>
    </ion-app>
</template>
