<script setup>
import { Link } from '~~/utils/links'
const routes = useRoute()
const links = new Link().links
const exactLink = links.filter(({ path }) => routes.path.includes(path))[0]
console.log('exactLink: ', exactLink)

const components = exactLink?.components?.map((component) => {
  const { props = {}, name } = component
  // split the data and the component instance so you can v-bind the data easier in the template
  return {
    data: {
      ...props,
      vModel: props?.vModel !== null && props?.vModel !== undefined ? ref(props.vModel) : null,
    },
    // A note is that if you use path aliases for dynamic imports like @ or ~ you might experience issues.
    component: defineAsyncComponent(async () => await import(`../../../components/${name}.vue`)),
  }
}) || []
console.log('components: ', components)

const from = ref(routes.redirectedFrom)
</script>

<template>
  <div flex-row grid="flow-row-dense ~" scroll-block scrollbar scrollbar-rounded items-center w="full" h="full" mx-auto>
    <h2 m="t-4 b-8" text="4xl dark:white" font-extrabold>
      Ադմինիստրավորում
    </h2>
    <!-- <ClientOnly> -->
    <div mx-auto flex inline-flex items="center" />
    <div mx-auto flex inline-flex items="center">
      <NuxtLink v-if="from" flex w-36 btn m-3 text-sm align-middle justify-between items-center to="/">
        <span i-twemoji:waving-hand text-3xl inline-block animate-shake-x animate-count-infinite animate-duration-5000 />
        Back
      </NuxtLink>
      <div flex btn h-11 m-3 text-sm align-middle justify-between items-center @click.stop="newRequest">
        Թարմացնել տվյալները
      </div>
    </div>
    <div v-if="components.length" mx-auto flex inline-flex items="center">
      <div v-for="(component, i) in components" :key="`${i}`">
        <component
          :is="component.component" v-if="component?.data?.vModel !== null" :id="`${i}`" v-bind="component.data"
          mx-2
        />
        <!-- <component v-else-if="component?.value" :is="component.value.component" mx-2 /> -->
      </div>
    </div>
    <div container m="4 x-auto">
      <FTable v-if="statement" :src="statement" mt-8 />
    </div>
  </div>
</template>
