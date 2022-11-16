import { format } from 'date-fns'
import { CheckResponse, PropertyList, EasypayOptions } from '~~/nuxt'
import { PaymentSystem } from '../PaymentSystemClass'
export { Check } from './check-class'

const { paymentSystems } = useRuntimeConfig()

export class Easypay extends PaymentSystem {
  private list = new Map<string, any>([['logs', []]])

  constructor() {
    super('easypay')
    super.addOption('token', paymentSystems.easypayTocke)
    super.addOption('successResponse', {
      ResponseMessage: 'Գործողությունը թույլատրված է',
      ResponseCode: 0,
      Debt: 0.00,
      Checksum: '',
      PropertyList: [{ key: 'Բաժանորդ', value: '' }, { key: 'Բաժանորդային համար', value: '' }],
    })
    super.addOption('errorResponse', {
      name: 'paymnet.fnet.am/check',
      statusCode: 401,
      statusMessage: 'It is necessary to check the validity conditions',
      data: {
        ResponseMessage: 'Գործողությունը արգելված է',
        ResponseCode: 1,
        Debt: 0,
        Checksum: '',
        PropertyList: [],
      },
    })
  }

  setLog(value: CheckResponse) {
    const logs = this.list.get('logs')
    const k = `${format(Date.now(), 'yyyy-MM-dd')}`
    const v = JSON.stringify(value)

    logs?.push({ [k]: v })
  }

  getToken() {
    return this.getOptions().token
  }

  getOption(propertyName: string) {
    return super.getOption(propertyName)
  }

  setResponse(
    type: 'successResponse' | 'errorResponse',
    responseValues: { Debt?: number; Checksum: string; PropertyList: PropertyList[] },
  ) {
    const response
      = type === 'successResponse'
        ? this.getOption(type)
        : this.getOption(type).data

    response.Debt = responseValues.Debt || 0
    response.Checksum = responseValues.Checksum
    response.PropertyList = responseValues.PropertyList
    return response
  }

  getOptions(): EasypayOptions {
    return this.getOptions()
  }
}
