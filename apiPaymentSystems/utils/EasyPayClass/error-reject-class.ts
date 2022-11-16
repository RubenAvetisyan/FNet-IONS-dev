import { PropertyList } from '~~/nuxt'

interface RejectType {
  [key: string]: string | number
  data: {
    ResponseMessage: 'Գործողությունը արգելված է'
    ResponseCode: 1
    Debt: number
    Checksum: string
    PropertyList: PropertyList[]
  }
}
export abstract class CheckResponseWithError {
  reject: RejectType

  constructor() {
    this.reject = {
      name: 'paymnet.fnet.am/check',
      statusCode: 401,
      statusMessage: 'It is necessary to check the validity conditions',
      data: {
        ResponseMessage: 'Գործողությունը արգելված է',
        ResponseCode: 1,
        Debt: number,
        Checksum: string,
        PropertyList,
      },
    }
  }
}

export class ErrorType implements CheckResponseWithError {
  errorTpes = new Map()
  constructor() {
    super()
  }

  addErrorType<K extends string, V>(errorTypename: K, description: V): void {
    this.errorTpes.set(errorTypename, description)
  }

  getErrorType(errorTypename: string): any {
    return this.errorTpes.get(errorTypename)
  }
}
