<script setup>
const links = ref({
  'Անհատներ': 'https://fnet.am/home',
  'Բիզնես': 'https://fnet.am/business-hy',
  'Մեր մասին': 'https://fnet.am/Մեր-մասին',
})
</script>

<template>
  <ul class="flex mx-[20px] py-[9px]">
    <li v-for="(value, key, index) in links" :key="index" class="px-[20px] group">
      <a :href="value">{{ key }}</a>
      <div
        class="w-full group-hover:border-b mt-1 transform origin-left delay-100 -translate-x-1/2 group-hover:translate-x-0 duration-200 duration-00 ease-out group-hover:animate-pulse"
      />
    </li>
  </ul>
</template>
