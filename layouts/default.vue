<script setup>
import { storeToRefs } from 'pinia'
import { initModals } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
  initModals()
})

const { isAlert, alertMsg } = storeToRefs(useAlertStore())

const route = useRoute()
const { $isLoading } = useNuxtApp()

const isLoading = computed(() => $isLoading.value)

const msgs = computed(() => {
  return alertMsg.value.split('.')
})

const links = ref([
  { name: 'Home', link: '/' },
  { name: 'Payment API', link: '/payment' },
  { name: 'Services', link: '/user' },
  { name: 'Pricing', link: '/user' },
  { name: 'Contact', link: '/user' },
])
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
        <n-list-item v-for="l in links" :key="l.name" :link="l.link" :exact="l?.exact" :external="l.external">
          {{ l.name }}
        </n-list-item>
      </template>
    </navbar>
    <div class="fixed w-1/3 left-0 right-0 px-10 top-0 z-100 mx-auto">
      <alert v-if="isAlert" class="flex items-center mx-auto">
        <span class="font-medium">{{ msgs[0] }}.</span>
        {{ msgs[1] || '' }}
      </alert>
    </div>
    <div container h-full mx-auto mb-1 px-10>
      <slot />
    </div>
    <div class="mt-5 mx-auto text-center opacity-90 text-sm">
      <sticky-footer>
        <FooterM mt-1 />
      </sticky-footer>
    </div>
    <teleport to="body">
      <ModalLoginForm />
    </teleport>
  </main>
</template>
