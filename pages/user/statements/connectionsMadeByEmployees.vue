<script setup lang="ts">

const userConnectedConracts = ref('')
const { data: userDetails } = await useLazyAsyncData('employees', () => $fetch('/api/get-employees-connections', {
  method: 'post',
  body: {
    contractNumbers: userConnectedConracts.value
  }
}), {
  pick: ['header', 'body'],
  watch: [userConnectedConracts]
})

const { data: userInfo } = await useFetch('/api/get-employees-connections', {
  pick: ['header', 'body'],
  transform: data => {
    const header = ['Միացումների քանակ', 'Աշխատակից']
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
  }
})

const connectionsTable = computed(() => {
  const result = {
    header: userInfo.value?.header,
    body: userInfo.value?.body.map(obj => {
      obj.employee.fn = () => userConnectedConracts.value = obj.employee.contractNumbers
      return obj
    })
  }

  return result
})

const connectionsTableRows = ref(6)

const result = ref({})

watch(() => userDetails.value, (n) => {
  if (n) {
    console.log('userDetails.value: ', n);
    result.value = {
      header: n.header,
      body: n.body
    }
    connectionsTableRows.value = 1
  }
})
</script>

<template>
  <div>
    <div flex justify-between>
      <div w-lg>
        <FTable :src="connectionsTable" :rows="connectionsTableRows" :footer="true" />
      </div>
      <div w-xl>
        <FTable :key="1" :src="userInfo" :rows="1" :footer="true" />
      </div>
    </div>
    <FTable :key="2" :src="result" :rows="6" :footer="true" />
  </div>
</template>
