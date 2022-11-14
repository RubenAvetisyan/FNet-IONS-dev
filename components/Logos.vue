<script setup>
const color = useColorMode()
const cl = computed(() => {
  return color.preference === 'dark' ? 'text-light' : 'text-purple5' + ' mt--2'
})
</script>

<template>
  <div class="group" inline-flex text-2xl font-300 cursor-default select-none>
    <div flex flex-col children:mx-auto>
      <Logo w-18 h-18 inline-block transition-all-500 transform group-hover:rotate-360 hover:text-purple6 fill-current :class="cl" />
      <span :class="cl" class="select-none duration-1000 group-hover:transform group-hover:-translate-y-4">Family Network</span>
    </div>
  </div>
</template>
