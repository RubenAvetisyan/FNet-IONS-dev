import { format } from 'date-fns';
import { PaymentSystem } from '../PaymentSystemClass'
import { Check } from './check-class'

type EasypayOptions = {
    token: string
}

const { paymentSystems } = useRuntimeConfig()

export type PropertyList = {
    key: 'Բաժանորդ' | 'Բաժանորդային համար' | string
    value: string
}[]

export type CheckResponse = {
    ResponseMessage: 'Գործողությունը թույլատրված է'
    ResponseCode: number
    Debt: number
    Checksum: string
    PropertyList: PropertyList
}

export class Easypay extends PaymentSystem {
    private list = new Map()
    private check = new Check()

    constructor() {
        super('easypay')
        super.addOption('token', paymentSystems.easypayTocke)
        super.addOption('checkResponse', {
            ResponseMessage: 'Գործողությունը թույլատրված է',
            ResponseCode: 0,
            Debt: 0.00,
            Checksum: '',
            PropertyList: [{ key: 'Բաժանորդ', value: '' }, { key: 'Բաժանորդային համար', value: '' }],
        })
    }

    setResponse<T>(value: T) {
        this.check.check()
    }


    setLog(value: CheckResponse | { [key: string]: any }) {
        this.list.set('log - ' + format(Date.now(), 'yyyy.MM.dd'), JSON.stringify(value))
    }

    getToken() {
        return this.getOptions().token
    }

    getOptions(): EasypayOptions {
        return this.getOptions()
    }
}
