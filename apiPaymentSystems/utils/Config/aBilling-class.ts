import { PaymentSystem } from '../PaymentSystemClass/index'
import { AbillingErrorStatusCode } from './abilling-error-class'
import type { CredentialType, DefaultCredentialKey } from './abilling-credential-class'
import { Credential } from './abilling-credential-class'
import type { ABillingParam } from './abilling-param-class'
import { Param } from './abilling-param-class'

export class ABilling {
    billingCred = new Credential()
    billingParams = new Param()
    errors = new AbillingErrorStatusCode()
    credentials: Map<string, CredentialType>
    private paymentSystems = new Map<string, any>()

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
}
