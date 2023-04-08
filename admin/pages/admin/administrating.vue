<script setup>
</script>

<template>
  <div w="full" h="full">
    <h2 m="t-4 b-8" text="4xl dark:white" font-extrabold>
      Ադմինիստրավորում
    </h2>
    <!-- <ClientOnly> -->
    <div container m="4 x-auto" grid grid-cols-4 gap-4>
      <AdminLanbillingSync items-center mx-auto />
      <AdminManualPayment />
      <!-- <AdminMakeComponent /> -->
    </div>
    <!-- </ClientOnly> -->
  </div>
</template>
