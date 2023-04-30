<script setup lang="ts">
const message = `Դուք չեք հանդիսանում այն խմբի անդամ,
որի իրավասությունները թույլ են տալիս մուտք գործել համակարգի համապատասխան բաժին․
Ձեր կողմից կատարված գործողությունները կվերլուծվեն անվտանգության աշխատակիցների կողմից․․․`
</script>

<template>
  <div flex mx-auto items-center w-3xl h-full>
    <div bg-red-700 text-light font-400>
      {{ message }}
    </div>
  </div>
</template>
