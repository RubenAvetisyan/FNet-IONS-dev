<script setup>
import { storeToRefs } from 'pinia'
import { initModals } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
  initModals()
})

const alertStore = useAlertStore()
const { isAlert, alertMsg } = storeToRefs(alertStore)
console.log('isAlert: ', isAlert);

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
])

onErrorCaptured((err) => alertStore.setAlert(err, 'warning'))
</script>

<template>
    <main class="py-20 text-center h-screen">
      <Loading v-show="isLoading" />
      <!-- <Header /> -->
      <navbar fixed top-0 mx-auto w-full justify-space-between>
        <template #extra>
          <LoginButton v-if="route.path !== '/login'" class="rounded-lg" />
        </template>

        <template #listItems>
          <n-list-item v-for="link in links" :key="links.name" :link="link.link" :exact="link?.exact"
            :external="link.external" :tooltipText="link?.tooltipText" tooltipPlacement="bottom">
            {{ link.name }}
          </n-list-item>
        </template>
      </navbar>
        <div class="fixed w-1/3 top-0 left-0 right-0 px-10 top-0 z-100 mx-auto z-100">
          <Alert />
      </div>
      <div container h-full mx-auto mb-1 px-10>
        <slot />
      </div>
      <!-- <div class="mt-5 mx-auto text-center opacity-90 text-sm">
<sticky-footer>
<FooterM mt-1 />
</sticky-footer>
</div> -->
      <teleport to="body">
        <ModalLoginForm />
      </teleport>
  </main>
</template>
