<script setup lang="ts">
import { OverlayEventDetail, modalController } from '@ionic/core/components'
import { VueElement } from 'vue';

const name = ref('Modal')
const message = ref('')

const cancel = () => {
  return modalController.dismiss(null, 'cancel')
}

const confirm = () => {
  return modalController.dismiss(name.value, 'confirm')
}

const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
  if (ev.detail.role === 'confirm') {
    message.value = `Hello, ${ev.detail.data}!`;
  }
}
</script>
<template>
  <!-- Main modal -->
            <ion-modal ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
              <ion-header>
                <ion-toolbar>
                  <ion-buttons slot="start">
                    <ion-button @click="cancel()">Cancel</ion-button>
                  </ion-buttons>
                  <ion-title>Welcome</ion-title>
                  <ion-buttons slot="end">
                    <ion-button :strong="true" @click="confirm()">Confirm</ion-button>
                  </ion-buttons>
                </ion-toolbar>
              </ion-header>
              <ion-content class="ion-padding ion-justify-content-center">
                <slot></slot>
              </ion-content>
            </ion-modal>

            <!-- <div flext items-center mx-auto bg-white rounded-lg shadow dark:bg-gray-700 relative>
        <SimpleButton />
        <LoginForm />
      </div> -->
</template>
