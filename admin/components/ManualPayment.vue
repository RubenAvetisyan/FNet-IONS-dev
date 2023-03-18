<script setup>
const goToLogPage = () => navigateTo('/admin/makePayment')
</script>

<template>
  <admin-card>
    <template #head>
      Մանուալ Վճարում
    </template>
    <div w-full>
      <p>
        Վճարումներ կարելի է կատարել միայն նշված վճարային համակարգերի,
        ինչպես նաև
      </p>
      <span
        class="w-max bg-gradient-to-r to-purple-500 from-indigo-700 text-transparent m-2 bg-clip-text"
      >FnetPay</span>
      <p> մոդուլի միջոցով։</p>
    </div>
    <code>{{ `[ EasyPay, Tellcell, Idram ]` }}</code>
    <template #bottom>
      <FBtn
        w="48" min="w-14" rounded="md" p="x-2 y-1" justify="center" text="light-50 center" bg-purple-700
        hover:bg-purple-600 dark:bg-purple-700 @click="goToLogPage"
      >
        Կատարել Վճարում
      </FBtn>
    </template>
  </admin-card>
</template>
