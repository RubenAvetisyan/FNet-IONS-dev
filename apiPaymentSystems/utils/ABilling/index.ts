import { PaymentSystem } from '../PaymentSystemClass/index'
import { AbillingErrorStatusCode } from './abilling-error-class'
import { Credential } from './abilling-credential-class'
import { Param } from './abilling-param-class'
import { Parser } from './parser-class'

export class ABilling {
  billingCred = new Credential()
  billingParams = new Param()
  errors = new AbillingErrorStatusCode()
  parser: Parser = new Parser()
  credentials: Map<string, CredentialType>
  private paymentSystems = new Map<string, any>()
  public BASE_URL = 'https://billing.fnet.am/bgbilling/idealer'

  constructor() {
    this.credentials = this.billingCred.credentials
  }

  getCredential(key: DefaultCredentialKey | string): CredentialType | {} {
    return this.credentials.get(key) || {}
  }

  setCredential(key: string, value: CredentialType): void {
    this.credentials.set(key, value)
  }

  getParam(key: string): ABillingParam | {} {
    return this.billingParams.params.get(key) || {}
  }

  setParam(key: string, value: ABillingParam): void {
    this.billingParams.params.set(key, value)
  }

  addPaymentSystem<T extends PaymentSystem>(name: string, paySystem?: T): void {
    const paymentSystem: PaymentSystem = paySystem || new PaymentSystem(name)
    this.paymentSystems.set(name, paymentSystem)
  }

  getPaymentSystem(name: string): PaymentSystem {
    return this.paymentSystems.get(name)
  }

  setUrl(CONTRACT_ID: string | number) {
    return `${this.BASE_URL}?action=ContractFind&contract_title_1=${CONTRACT_ID}&mid=3&accurate=true`
  }

  async getContract(
    CONTRACT_ID: string,
    PAYMENT_SYSTEM_NAME: string,
    REQUEST_LANGUAGE: 'hy' | 'ru' | 'en',
    REQUEST_CHECKSUM: string,
  ) {
    const completeUrl = this.setUrl(CONTRACT_ID)
    const paymentSystem: PaymentSystem = this.getCredential(PAYMENT_SYSTEM_NAME) as PaymentSystem
    const credentials = paymentSystem.getOption('credentials') as {
      user: string
      password: string
    }

    const auth = `Basic ${Buffer.from(`${credentials.user}:${credentials.password}`, 'binary').toString('base64')}`
    const response = await $fetch(completeUrl, {
      headers: {
        Authorization: auth,
        // 'Cookie': 'JSESSIONID=C7076F3920E4CD4F3C1D80A0F74319FF'
      },
    }) as string

    const result = await this.parser.xmlParser(response, REQUEST_LANGUAGE, REQUEST_CHECKSUM)

    return result
  }
}
