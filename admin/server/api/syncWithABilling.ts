export default defineEventHandler(async (event) => {
  const { data } = await useBody(event)
  // data = { ...data, isTest: true }
  try {
    if (!data.Checksum) {
      console.log('WRONG DATA !!!')
      return false
    }

    let URI = ''

    switch (data.PaymentSystemName) {
      case 'Easypay':
        URI = '/api/payment'
        break
      case 'Tellcell':
        URI = '/api/tellcell/?action=payment'
        break
      case 'Idram':
        URI = '/api/idram/?action=payment'
        break
      default:
        console.log(`Class for "${data.PaymentSystemName}" is unrealized`)
        break
    }

    if (!URI)
      return 'not Done'

    const response = await $fetch(URI, {
      method: 'POST',
      body: data,
    })

    // const response = await new Promise((resolve) => {
    //     console.log('data on sync: ', data)
    //     setTimeout(() => resolve('done'), 1000)
    // })

    console.log('response: ', response)
    return response
  }
  catch (error) {
    console.log('data: ', data)
    console.log('error: ', error)
  }
})
