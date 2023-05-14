<template>
    <ion-card>
      <ion-card-header v-if="$slots.title || $slots.subtitle">
        <ion-card-title>
          <slot name="title"></slot>
        </ion-card-title>
        <ion-card-subtitle>
          <slot name="subtitle"></slot>
        </ion-card-subtitle>

      </ion-card-header>
      <ion-card-content v-if="$slots.default">
        <slot />
      </ion-card-content>

      <div v-if="$slots.bottom" flex h-max items-end>
        <slot name="bottom" />
      </div>
    </ion-card>
</template>
