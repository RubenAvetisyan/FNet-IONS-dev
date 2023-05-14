<script setup>
import { z } from 'zod'
import { format } from 'date-fns'
import { isDate } from '@antfu/utils'

const { data: userInfo } = useAuth()


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
const { $isLoading, $startLoading, $finishLoading } = useNuxtApp()

$startLoading()
const { data, pending } = await useFetch('/api/get-mustpay', {
  pick: ['header', 'body']
})
$finishLoading()

const mustPay = computed(() => {
  console.log('data.value: ', data.value);
  const header = data.value?.header || []
  const indexOfRegion = header.indexOf('Մարզ')

  const body = data.value?.body.filter(item => {
    return item[indexOfRegion] === userInfo.value.region
  }) || []

  return { header, body }
})

const indexOfPhone = computed(() => mustPay.value.header.indexOf('Հեռախոս'))
const xlsxHeader = computed(() => [mustPay.value.header[indexOfPhone.value]])
const xlsxBody = computed(() => {
  const result = []
  mustPay.value.body.forEach((item) => {
    const phone = item[indexOfPhone.value]
    if (phone?.length >= 6) result.push([phone])
  })

  return result
})

onMounted(() => {
  if ($isLoading.value) $startLoading()
  console.log('mustPay: ', data.value, mustPay.value);
  console.log('xlsxBody: ', xlsxBody.value);
})


watch(() => pending.value, (loading) => {
  console.log('$isLoading: ', $isLoading.value);
  if (!loading) $finishLoading()
})
</script>

<template>
  <ClientOnly>
        <FTable v-if="mustPay?.body.length" :key="`must-pay-${mustPay.body.length}`"
          name="Վճարման ենթակա ծառայությունների ցանկ" :src="mustPay" :footer="true" mt-8 h-full max-h-4xl>
          <template #save>
            <SaveXlsx key="save" :header="xlsxHeader" :body="xlsxBody" float-right />
          </template>
        </FTable>
        <div w-fill h-full bg-brand-primaryDark text-dark:gray-400 font-300>Տվյալները բացակայում են</div>
  </ClientOnly>
</template>
