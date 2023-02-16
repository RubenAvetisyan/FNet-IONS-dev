export default defineEventHandler(async (event) => {
  const { data } = await readBody(event)
  console.log('data: ', data)

  // data = { ...data, isTest: true }
  try {
    if (!data.Checksum) {
      console.warn('WRONG DATA !!!')
      return false
    }

    let URI = ''

    switch (data.PaymentSystemName) {
      case 'Easypay':
        URI = 'http://localhost:3000/payment'
        break
      case 'Tellcell':
        URI = 'http://localhost:3000/telcell/?action=payment'
        break
      case 'Idram':
        URI = 'http://localhost:3000/idram/?action=payment'
        break
      case 'FnetPay':
        URI = 'http://localhost:3000/fney-pay/?action=payment'
        break
      default:
        console.error(`Class for "${data.PaymentSystemName}" is unrealized`)
        break
    }

    if (!URI)
      return 'not Done'

    const response = await $fetch(URI, {
      method: 'POST',
      body: data,
    })

    // console.log('response: ', response)
    return response
  }
  catch (error) {
    console.error('error: ', error)
  }
})
