<template>
  <main class="py-20 px-10 text-center h-screen">
    <Header />
    <div container h-full mx-auto mb-1>
      <slot />
    </div>
    <Footer mt-4 />
    <div class="mt-5 mx-auto text-center opacity-25 text-sm">
      [Default Layout]
    </div>
  </main>
</template>
