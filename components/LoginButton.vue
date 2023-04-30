<script setup lang="ts">
// const adminAuthStor = useAdminAuthStore()
const props = defineProps({
  isMini: {
    type: Boolean,
    default: false
  }
})

const color = useColorMode()
const isDark = computed(() => color.value === 'dark')

const { signOut, status, data } = useAuth()
console.log('status: ', status.value);
console.log('user: ', data.value);
const btnText = computed(() => status ? 'Ելք' : 'Մուտք')

const logout = () => {
  signOut()
  // useFetch('/api/auth/signout')
}
</script>

<template>
    <div overflow="hidden">
      <!-- Modal toggle -->
      <button v-if="status !== 'authenticated'" bg="brand-primary dark:[#783cde] hover:brand-primary"
        ring="focus:purple-300 dark:focus:[#4b1d99]" p="x-5 y2.5" text="white sm center" font="medium" type="button"
        data-modal-toggle="authentication-modal">
        {{ btnText }}
      </button>

      <div v-else f-btn flex justify-center @click.stop="logout">
        <div h-full inline-flex justify-center>
          <div mdi-logout w-7 h-7></div>
          <span v-if="!isMini">{{ btnText }}</span>
      </div>
      <div class="logout-icon" />
    </div>
  </div>
</template>
