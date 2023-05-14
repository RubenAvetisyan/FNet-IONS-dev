<script setup lang="ts">
import { modalController } from '@ionic/core/components'
import Modal from './ModalLoginForm.vue'
const openModal = async () => {
  const modal = await modalController.create({
    component: Modal,
  });
  modal.present();

  const { data, role } = await modal.onWillDismiss();

}
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
const btnText = computed(() => status.value === 'authenticated' ? 'Ելք' : 'Մուտք')

const logout = () => {
  signOut()
  // useFetch('/api/auth/signout')
}
</script>

<template>
      <div>
        <!-- Modal toggle -->
        <ion-button id="open-modal" v-if="status === 'unauthenticated'" fill="solid" color="primary">
          {{ btnText }}
        </ion-button>

        <ion-button v-else color="primary" fill="outline" flex justify-center @click.stop="logout">
          <div h-full inline-flex justify-center>
            <div mdi-logout w-7 h-7></div>
            <span v-if="!isMini">{{ btnText }}</span>
          </div>
          <div class="logout-icon" />
        </ion-button>
      </div>
</template>

<style scoped>
ion-button {
  --background: var(--ion-color-brand-primary);
  --background-hover: var(--ion-color-brand-primary-hover);
  --background-focused: var(--ion-color-brand-primary);
  --background-activated: var(--ion-color-brand-primary-hover);
  --border-color: transparent;
  --border-radius: 4px;
  --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.11);
  --color: #ffffff;
  --padding-start: 1.25rem;
  --padding-end: 1.25rem;
  --padding-top: 0.625rem;
  --padding-bottom: 0.625rem;
  --text-transform: none;
  --font-size: 16px;
  --font-weight: 500;
}
</style>
