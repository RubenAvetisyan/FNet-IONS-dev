<script setup>
import { Link } from '~~/utils/links'

definePageMeta({
  layout: 'user',
  name: 'Statements',
  title: 'Statements'
})

const router = useRouter()
const routes = router.getRoutes()
console.log('getRoutes: ', routes.filter((route => route.path.includes('/user/statements'))));

const { data: userInfo } = useAuth()

const route = useRoute()
console.log('route: ', route);

const link = new Link(route, userInfo.value?.uid)
console.log('setPath: ', link.setPath);
console.log('route: ', link.route);
console.log('routes: ', link.getWithRestricted(userInfo.value?.uid));
const links = ref([])

onMounted(() => {
  links.value = link.links
  console.log('links: ', links.value);
})

// const filteredLinks = computed(() => {
//   return links.filter(link => {
//     return link.rules?.rules[link.path]?.access?.userIds ? link.rules.rules[link.path].access.userIds.includes(userInfo.value?.uid) : true
//   })
// })
</script>

<template>
                  <div w="full" h="full">
                    <h2 m="t-4 b-8" text="4xl dark:white" font-extrabold>
                      Հաշվետվություններ
                    </h2>
                    <!-- <ClientOnly> -->
                    <div container m="4 x-auto" grid grid-cols-4 gap-4 gap-y-2>
                      <card v-for="link in links" p-0>
                          <template #title>
                            <nuxt-link :to="{
                              path: link.path, query: link.query,
                            }" :page-key="link.text" cursor="pointer" block w-full h-full px-5 py-10>
                              {{ link.text }}
                            </nuxt-link>
                          </template>
      </card>
    </div>
  </div>
</template>
