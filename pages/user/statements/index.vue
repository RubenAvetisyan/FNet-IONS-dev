<script setup>
import { Link } from '~~/utils/links'

definePageMeta({
  requiresAuth: true,
  layout: 'user',
})

const route = useRoute()

const links = new Link(route).links
</script>

<template>
  <div w="full" h="full">
    <h2 m="t-4 b-8" text="4xl dark:white" font-extrabold>
      Հաշվետվություններ
    </h2>
    <!-- <ClientOnly> -->
    <div container m="4 x-auto" grid grid-cols-4 gap-4 gap-y-2>
      <card v-for="link in links" p-0>
        <nuxt-link
          :to="{
            path: link.path, query: link.query,
          }" :page-key="link.text" cursor="pointer" block w-full h-full px-5 py-10
        >
          {{ link.text }}
        </nuxt-link>
      </card>
    </div>
  </div>
</template>
