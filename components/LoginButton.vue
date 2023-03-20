<script setup>

const { signOut, getSession, getProviders } = useSession()
const session = await getSession()
// const adminAuthStor = useAdminAuthStore()
const isAdmin = ref(session.user)
console.log('isAdmin: ', isAdmin);
const isUser = ref(null)
const logout = ref(null)

watchEffect(async () => {
  const session = await getSession()
  isAdmin.value = session.user
  isUser.value = true // adminAuthStor.isUser
  logout.value = false // adminAuthStor.logout
})
</script>

<template>
      <div overflow="hidden">
        <!-- Modal toggle -->
        <button v-if="!isAdmin && !isUser" bg="brand-primary dark:[#783cde] hover:brand-primary"
          ring="focus:purple-300 dark:focus:[#4b1d99]" p="x-5 y2.5" text="white sm center" font="medium" type="button"
          data-modal-toggle="authentication-modal">
          Login
        </button>

        <div v-else class="btn-blue" @click.stop="signOut({ callbackUrl: '/' })">
      <div grow>
        logout
      </div>
      <div class="logout-icon" />
    </div>
  </div>
</template>
