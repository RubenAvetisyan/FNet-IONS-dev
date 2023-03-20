<script setup>
import { z } from 'zod'
import { format } from 'date-fns'
import { isDate } from '@antfu/utils'

definePageMeta({
  auth: false,
})

const key = Date.now() + ''

const MustPaySchema = z.object({
  contract: z.string({ description: 'contract Number' }),
  agreementDate: z.string(),
  customerName: z.string(),
  phone: z.string(),
  contractId: z.string(),
  customerType: z.string(),
  payDay: z.number(),
  balance: z.number(),
  tariff: z.string(),
  discount: z.string(),
  totalCostTariff: z.number(),
  discountEndDate: z.date(),
  dayOfPayment: z.string(),
  status: z.string(),
});

// type MustPay = z.TypeOf<typeof MustPaySchema>;

const { data, pending } = await useFetch('/api/get-mustpay', {
  pick: ['header', 'body']
})
const mustPay = computed(() => {
  console.log('data.value: ', data.value);
  const header = data.value?.header || []
  const body = data.value?.body || []
  return { header, body }
})

const { $finishLoading, $startLoading, $isLoading } = useNuxtApp()

onMounted(() => {
  if ($isLoading.value) $startLoading()

  console.log('mustPay: ', data.value, mustPay.value);
})

watch(() => pending.value, (loading) => {
  console.log('$isLoading: ', $isLoading.value);
  if (!loading) $finishLoading()
})
</script>

<template>
  <ClientOnly>
    <div m="4" p="b-50">
      <p>Վճարման ենթակա ծառայությունների ցանկ</p>
      {{ $isLoading }}
      <FTable v-if="mustPay.body.length" :src="mustPay" rows="7" class="mt-8" />
    </div>
  </ClientOnly>
</template>
