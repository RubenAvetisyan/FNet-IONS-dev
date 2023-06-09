<script setup lang="ts">
import { format } from 'date-fns';


const { data: user } = useAuth()
const { $startLoading, $finishLoading } = useNuxtApp()

if (!user.value?.isAdmin && !['127', '224'].includes(user.value?.uid)) {
  navigateTo({
    path: '/protected'
  })
}

const userConnectedConracts = ref('')
const { data: userDetails, pending: pendingConnections } = await useLazyAsyncData('employees', () => $fetch('/api/get-employees-connections', {
  method: 'post',
  body: {
    contractNumbers: userConnectedConracts.value
  }
}), {
  pick: ['header', 'body'],
  transform: data => {
    console.log('data: ', data);
    const body = data.body.map((b) => Object.values(b))

    return {
      header: data.header,
      body
    }
  },
  watch: [userConnectedConracts]
})

const max = format(Date.now(), 'yyyy-MM-dd')
const dateTime = ref(max)
const date = computed(() => dateTime.value)

const { data: userInfo, pending: pendingUserInfo } = await useLazyAsyncData('userInfo', () => $fetch(`/api/get-employees-connections?date=${date.value}`), {
  pick: ['header', 'body'],
  transform: (data) => {
    const header = [{
      text: 'Միացումների քանակ'
    }, {
      text: 'Աշխատակից'
    }]
    const body = data.body.map(obj => {
      return {
        count: obj.count,
        employee: {
          text: obj.employee,
          contractNumbers: obj.contractNumbers,
          fn: () => { }
        },
      }
    })

    return {
      header,
      body,
    }
  },
  watch: [date]
})

const connectionsTable = computed(() => {
  const result = {
    header: userInfo.value?.header || [],
    body: userInfo.value?.body.map(obj => {
      obj.employee.fn = () => userConnectedConracts.value = obj.employee.contractNumbers
      return obj
    }) || []
  }

  return result
})

const connectionsTableRows = ref(6)

const result = ref<{
  header: (string | number | { text: string })[];
  body: any[];
} | null>(null)

watch(() => userDetails.value, (n) => {
  if (n) {
    console.log('userDetails.value: ', n);
    result.value = {
      header: n.header || [],
      body: n.body || []
    }
    connectionsTableRows.value = 1
  }
  console.log('result.value : ', result.value);
})

watch([pendingUserInfo.value, pendingConnections.value], (n, o) => {
  if (n.some(v => v)) {
    $startLoading()
  }
  else {
    $finishLoading()
  }
})
</script>

<template>
    <div>
      <div fixed top-0 bottom-0 flex justify-between>
        <FTable :src="connectionsTable" :rows="connectionsTable.body.length" :footer="true" max-w-sm>
          <template #caption>
            <ion-datetime-button datetime="datetime"></ion-datetime-button>
            <ion-modal :keep-contents-mounted="true">
              <ion-datetime id="datetime" :show-default-buttons="true" :max="max" v-model="dateTime" size="cover"
                presentation="month-year" locale="hy-AM"></ion-datetime>
            </ion-modal>
          </template>
        </FTable>
        <FTable v-show="result" :key="result?.body.join('')" :src="result || {
          header: [],
          body: []
        }" :rows="result?.body.length || 0" :footer="true" w-full lg:h-4xl />
      </div>
  </div>
</template>
