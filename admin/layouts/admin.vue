<script setup>
import { storeToRefs } from 'pinia'
const { isAlert, alertMsg } = storeToRefs(useAlertStore())

const msgs = computed(() => {
  return alertMsg.value.split('.')
})

const links = ref([
  { name: 'Dashboard', link: '/admin' },
  { name: 'Payment API', link: '/payment' },
  { name: 'Services', link: '/services' },
  { name: 'Pricing', link: '/price' },
  { name: 'Contact', link: '/contact' },
])
</script>

<template>
  <main class="flex py-0 pr-10 text-center h-screen">
    <Drawer class="top-0 left-0" />

    <div class="grow">
      <!-- <Alerter /> -->
      <div class="fixed w-1/3 left-0 right-0 px-10 top-2 z-100 mx-auto">
        <alert v-if="isAlert" class="flex items-center mx-auto">
          <span class="font-medium">{{ msgs[0] }}.</span>
          {{ msgs[1] || '' }}
        </alert>
      </div>

      <!-- <Header /> -->
      <navbar top-0 left-10 right-12 mx-auto w-full justify-space-between>
        <template #logo>
          <FullLogoButton />
        </template>
        <template #listItems>
          <n-list-item v-for="l in links" :key="l.name" :link="l.link" :exact="l?.exact" :external="l?.external">
            {{ l.name }}
          </n-list-item>
        </template>

        <template #extras>
          <LoginButton />
        </template>
      </navbar>
      <div container h-full mx-auto pt-20 mt-0 pb-5>
        <slot />
      </div>
      <div
        class="fixed z-20 p-4 w-full right-0 bottom-0 border-t border-gray-200 mx-auto shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600 text-center opacity-25 text-sm"
      >
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a
          href="https://flowbite.com/"
          class="hover:underline"
        >FNet™</a>. Իրավունքները պաշտպանված են.
        </span>
        <FooterM />
        <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
          </li>
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
          </li>
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">Licensing</a>
          </li>
          <li>
            <a href="#" class="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>
