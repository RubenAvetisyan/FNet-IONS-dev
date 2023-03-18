<template>
  <div inline="flex" text="2xl" font="300" cursor="default" select="none" class="group" mt="10">
    <div children:mx-auto>
      <Logo
        w="18" h="18" inline="block" transition="all-500" transform group-hover="rotate-360"
        text="brand-primary dark:light-50 hover:purple6" fill-current mt="-2"
      />
      <div
        select="none" duration="1000" group-hover="transform -translate-y-4" text="brand-primary dark:light-50"
        mt="-2"
      >
        Family Network
      </div>
    </div>
  </div>
</template>
