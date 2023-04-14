<template>
  <!-- Main modal -->
    <div id="authentication-modal" data-modal-placement="center" tabindex="-1" aria-hidden="true"
      class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 p-4 w-full md:inset-0 h-modal md:h-full z-0">
      <div class="relative w-full max-w-md h-full md:h-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <SimpleButton />
          <LoginForm />
      </div>
    </div>
  </div>
</template>
