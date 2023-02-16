<script setup lang="ts">
import type { Ref } from 'vue'

// const router = useRouter()

// definePageMeta({
//     key: route => route.fullPath
// })

const syncState = ref(false)

const isActive = computed({
  get: () => {
    return syncState.value
  },
  set: (value: boolean) => {
    syncState.value = value
  },
}) as Ref<boolean>

const { data: ready } = await useFetch('/api/syncmanupulation')

isActive.value = !!unref(ready.value) as boolean
if (!isActive.value) {
  const { data: interval } = await useFetch('/api/setpaymentinterval')
}

const message = computed(() => {
  return isActive.value
    ? ' համակարգի վճարման տրանզակցիաների համաժամացումն ակտիվացված է'
    : ' համակարգում վճարման տրանզակցիաները LanBilling համակարգի հետ համաժամացման համար սեղմեք START'
})

const syncButtonFn = async () => {
  const { data } = await useFetch('/api/syncmanupulation', {
    query: {
      state: isActive.value ? 'stop' : 'start',
    },
  })

  isActive.value = data.value as boolean
}

const color = computed(() => {
  return unref(isActive.value) ? 'bg-red-700 dark:bg-red-700 hover:bg-red-600' : 'bg-purple-700 dark:bg-purple-700 hover:bg-purple-600'
})

const showTooltip = ref(false)

const goToLogPage = () => navigateTo('/admin/synclog')
</script>

<template>
  <admin-card>
    <template #head>
      {{ isActive ? 'LanBilling' : 'ABilling' }}
    </template>
    {{ message }}

    <template #bottom>
      <button
        w="48" min="w-14" rounded="md" p="x-2 y-1" text="light-50" :class="[
          color,
        ]" @click.stop="syncButtonFn"
      >
        {{ isActive ? 'STOP' : 'START' }}
      </button>
    </template>

    <template #bottom-right>
      <f-btn
        class="group/tooltip" px-2 py-1 text-light-50 bg-gradient-to-r to-indigo-500 from-purple-500 rounded-lg
        @click="goToLogPage"
      >
        <div class="i-mdi-table-sync h-6 w-6" />
      </f-btn>
      <tooltip>
        Համաժամացումների տեղեկագիր
      </tooltip>
    </template>
  </admin-card>
</template>
