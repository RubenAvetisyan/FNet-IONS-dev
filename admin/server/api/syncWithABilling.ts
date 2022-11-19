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
        URI = 'http://localhost:3000/payment'
        break
      case 'Tellcell':
        URI = 'http://localhost:3000/telcell/?action=payment'
        break
      case 'Idram':
        URI = 'http://localhost:3000/idram/?action=payment'
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
