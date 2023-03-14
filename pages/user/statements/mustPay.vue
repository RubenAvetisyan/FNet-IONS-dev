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

const { data, pending } = await useLazyFetch('/api/getMustPay', {
  key,
  server: true,
  transform: mustPay => {
    return [
      mustPay?.length ? Object.keys(mustPay[0]) : [],
      mustPay?.map((obj) => {
        // if (typeof obj === 'object' && !Array.isArray(obj))
        return Object.values(obj)
      }) || []
    ]
  }
})
const mustPay = computed(() => {
  const result = {
    header: data.value[0],
    body: data.value[1]
  }

  return result
})

const isLoading = ref(pending.value)
console.log('isLoading: ', isLoading);

const { $finishLoading, $startLoading, $isLoading } = useNuxtApp()

watch(() => pending.value, (loading) => {
  $startLoading(loading)
  console.log('$isLoading: ', $isLoading.value);
  $finishLoading(!!loading)
  console.log('isLoading.value: ', isLoading.value);
})
</script>

<template>
  <ClientOnly>
    <div m="4" p="b-50">
      <p>Վճարման ենթակա ծառայությունների ցանկ</p>
      {{ isLoading }}
      <FTable v-if="mustPay.body.length" :src="mustPay" rows="7" class="mt-8" />
    </div>
  </ClientOnly>
</template>
