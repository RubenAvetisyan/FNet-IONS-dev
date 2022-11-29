<script setup>
const adminAuthStor = useAdminAuthStore()
const isAdmin = ref(null)
const isUser = ref(null)
const logout = ref(null)

watchEffect(() => {
  isAdmin.value = adminAuthStor.isAdmin
  isUser.value = adminAuthStor.isUser
  logout.value = adminAuthStor.logout
})
</script>

<template>
  <!-- Modal toggle -->
  <button v-if="!isAdmin && !isUser"
    class="block select-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    type="button" data-modal-toggle="authentication-modal">
    Login
  </button>
  
  <div v-else
    class="block cursor-pointer select-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    @click.stop="() => logout()">
    logout
  </div>
  
  <!-- Main modal -->
  <div id="authentication-modal" data-modal-placement="center" tabindex="-1" aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 p-4 w-full md:inset-0 h-modal md:h-full z-0">
    <div class="relative w-full max-w-md h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <SimpleButton />
        <LoginForm endpoint="/api/auth" />
      </div>
    </div>
  </div>
</template>
