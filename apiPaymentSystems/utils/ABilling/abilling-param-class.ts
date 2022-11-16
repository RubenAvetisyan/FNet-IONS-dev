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
