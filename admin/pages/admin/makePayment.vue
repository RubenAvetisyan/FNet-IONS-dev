<script setup>
import md5 from 'md5'
import { v4 as uuid } from 'uuid';

function generateTransactionCode() {
  const randomPart = Math.floor(Math.random() * 100000000);
  const timestampPart = String(Date.now()).slice(-8).replace(/\D/g, '');

  return `${randomPart}${timestampPart}`.substring(0, 8);
}

const TOKEN = '911f225af566b884fb3501132d65cb68'
const CONTRACT_ID = ref('')
const Amount = ref('')
const TransactID = ref(generateTransactionCode())
const paymentSystemNames = computed(() => {
  const paymentSystems = ['Easypay', 'Tellcell', 'Idram', 'FnetPay']
  return paymentSystems.map(ps => ({
    value: ps, label: ps
  }))
})
const PaymentSystemName = ref('')

const transformedData = computed(() => {
  const Checksum = md5(TOKEN + CONTRACT_ID.value + Amount.value + TransactID.value)
  return transformData({
    Amount: Amount.value,
    CONTRACT_ID: CONTRACT_ID.value,
    DtTime: Date.now(),
    TransactID: TransactID.value,
    Checksum,
    PaymentSystemName,
  })
})

function transformData({ CONTRACT_ID, Amount, TransactID, Checksum, DtTime, PaymentSystemName }) {
  return {
    Inputs: [`${CONTRACT_ID || 0}`, '', '', ''],
    Amount: Amount || 0,
    TransactID: TransactID || 0,
    Currency: 'AMD',
    Checksum: Checksum || '',
    DtTime: DtTime || '',
    PaymentSystemName: PaymentSystemName.value || '',
  }
}

const fn = (v) => {
  console.log('v: ', v);
  PaymentSystemName.value = v.target.value.join()
}

const processing = async () => {

  const { data, pending } = await useFetch('/api/syncWithABilling', {
    method: 'POST',
    body: {
      data: transformedData.value,
    },
  })


  CONTRACT_ID.value = ''
  Amount.value = ''
  TransactID.value = ''
}
</script>

<template>
  <div container mx-auto>
    <Suspense>
      <!-- <PageView /> -->
      <template #fallback>
        <div op50 italic>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
    <div w-full h-full flex flex-initial items-center justify-center mx-auto mt-10>
          <FInput id="CONTRACT_ID" v-model="CONTRACT_ID" label="Contract Number" placeholder="7000948" flex mx-auto />
          <FInput id="Amount" v-model="Amount" label="Summ" />
          <FInput id="TransactID" v-model="TransactID" readonly label="Transaction Code" flex mx-auto />
          <NewFSelect id="payment-systems" label="paymentSystemNames" v-model="PaymentSystemName" :options="paymentSystemNames" required
            :custom-fn="fn" />
        </div>
        <div w-full flex justify-center mx-auto mt-10>
          <FBtn w-52 bg-red-700 dark:bg-red-700 rounded-xl hover:bg-red-600 justify-center @click.stop="processing">
            Send
          </FBtn>
        </div>
      </div>
</template>
