<script setup>
const lang = ref({
  am: 'https://fnet.am/',
  ru: 'https://fnet.am/ru',
  en: 'https://fnet.am/en',
})

const toggle = () => {
  const classList = document.getElementById('dropdown')?.classList
  if (classList) {
    classList.toggle('hidden')
    classList.toggle('block')
  }
}
</script>

<template>
  <div>
    <f-btn @click="toggle">
      am
      <Chevron rotate-180 ml-1 fill-current light:text-black light:group-hover:text-light />
    </f-btn>
        <div id="dropdown" class="hidden" bg-white text-base list-none divide-y divide-gray-100 rounded shadow my-2 fixed
          right-3>
      <ul class="px-1 py-1" aria-labelledby="dropdown">
        <li v-for="(value, key, index) in lang" :key="index">
          <a :href="value" class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">{{ key }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
