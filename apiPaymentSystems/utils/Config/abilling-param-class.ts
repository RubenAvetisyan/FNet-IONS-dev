type ABillingParamKey = 'findContract' | 'addPayment' | string

interface FindContract {
  action: string
  mid: number // expecting the module index of external payment in ABilling system '3'. Other numbers of index are invalid...
  contract_title_1: string // client Contract ID
  accurate: boolean // 'false' is making the request invalid
}

interface AddPayment {
  action: string // expecting the module index of external payment in ABilling system '3'. Other numbers of index are invalid...
  cid: string // client ID
  trans: string // transaction id
  comment: string // usually The payment system NAME
  mid: number
  summ: number // amount of money
}

export type ABillingParam = FindContract | AddPayment

export class Param {
  params = new Map<ABillingParamKey, ABillingParam>([
    ['findContract', {
      action: 'ContractFind',
      mid: 3,
      contract_title_1: '',
      accurate: true,
    }],
    ['addPayment', {
      action: 'PaymentAdd',
      mid: 3,
      cid: '',
      summ: 0,
      trans: '',
      comment: '',
    }],
  ])

  addParam(key: string, value: ABillingParam) {
    this.params.set(key, value)
  }
}
