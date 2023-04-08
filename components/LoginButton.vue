<script setup lang="ts">
// const adminAuthStor = useAdminAuthStore()
const props = defineProps({
  isMini: {
    type: Boolean,
    default: false
  }
})

const { signOut, getSession, status, data } = useAuth()
console.log('status: ', status);
console.log('user: ', data.value);
const isAdmin = ref(false)
const isUser = ref(false)
const logout = computed(() => 'logout')

</script>

<template>
      <div overflow="hidden">
        <!-- Modal toggle -->
              <button v-if="status !== 'authenticated'" bg="brand-primary dark:[#783cde] hover:brand-primary"
                ring="focus:purple-300 dark:focus:[#4b1d99]" p="x-5 y2.5" text="white sm center" font="medium" type="button"
                data-modal-toggle="authentication-modal">
                Login
              </button>

              <div v-else btn-blue flex @click.stop="() => signOut()">
                <div w-full h-full grow inline-flex>
                  <div mdi-logout w-7 h-7></div>
                  <span v-if="!isMini">{{ logout }}</span>
      </div>
      <div class="logout-icon" />
    </div>
  </div>
</template>
