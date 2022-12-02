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
  <div class="overflow-hidden">
    <!-- Modal toggle -->
    <button v-if="!isAdmin && !isUser"
      class="btn-blue text-white bg-[#5723ae] hover:bg-[#783cde] focus:ring-purple-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-[#783cde] dark:hover:bg-[#5723ae] dark:focus:ring-[#4b1d99]"
      type="button" data-modal-toggle="authentication-modal">
      Login
    </button>
    
    <div v-else class="btn-blue" @click.stop="() => logout()">
      <div class="grow">logout</div>
      <div class="logout-icon"></div>
    </div>
  </div>
</template>
