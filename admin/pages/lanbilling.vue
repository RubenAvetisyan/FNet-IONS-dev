<script setup lang="ts">
const { data } = await useFetch('/api/system/lanbilling/agreement', {
  method: 'POST',
  body: {
    uid: 42241
  }
})
console.log('res: ', data.value);

definePageMeta({
  layout: 'admin'
})
</script>

<template>
  <IonPage>
    <IonCard>
      <IonCardHeader>
        <IonTitle>LanBilling</IonTitle>
      </IonCardHeader>
      <IonCardContent>
        <div class="h-full w-full"></div>
      </IonCardContent>
    </IonCard>
  </IonPage>
</template>
