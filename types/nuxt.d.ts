import type { Ref } from 'vue'

export { };

declare global {

    interface UseAutoSyncType {
        pause: () => void
        resume: () => void
        isActive: Ref<boolean>
    }

    interface AutoSync {
        pause: () => void
        resume: () => void
        isActive: boolean
    }

    interface AbillingERROR {
        statusCode: number
        message: {
            hy: string
            ru: string
            en: string
        }
    }

    interface EasypayOptions {
        token: string
    }

    type PaymentsResponseType = {
        Amount: number
        CONTRACT_ID: number
        DtTime: Date
        TransactID: number
        PaymentSystemName: string
    }

    interface LanBilling {
        Inputs: string[]
        Amount: number
        TransactID: number
        Currency: string
        Checksum: string
        DtTime: Date | string
        [key: string]: any
    }

    interface CredentialType {
        user: string
        passowrd: string
        [key: string]: any
    }

    type DefaultCredentialKey = 'easyPay' | 'idram' | 'tellcell' | 'mobidram'

    type ABillingParam = FindContract | AddPayment

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

    type Status<T> = T extends SuccessResposeType ? 'done' : 'error'

    type ErrorsResposeType = {
        ResponseMessage: string;
        ResponseCode: number;
        Debt: number;
        Checksum: string;
    }

    type SuccessResposeConractType = {
        id: string;
        comment: string;
        title: string;
        serviceSumma: string;
        balance: string;
    }

    type SuccessResposeType = {
        CONTRACT: SuccessResposeConractType;
        CLIENT_ID: string;
        CLIENT_NAME: string;
        CONDTRACT_ID: string;
        DEBT: string;
        BALANCE: string;
    }

    interface parseTheType<T extends SuccessResposeType | ErrorsResposeType> {
        status: Status<T>
        data: T
        isError: boolean
    }

    interface RequestType {
        Inputs: string[],
        Amount: number,
        TransactID: number,
        Currency: 'AMD' | 'RUB' | 'USD',
        Checksum: string,
        DtTime: string,
        Lang: 'hy' | 'ru' | 'en'
    }

    interface PropertyList {
        key: 'Բաժանորդ' | 'Բաժանորդային համար' | string
        value: string
    }

    interface CheckResponse {
        ResponseMessage: 'Գործողությունը թույլատրված է' | 'Գործողությունը արգելված է'
        ResponseCode: 0 | 1
        Debt: number
        Checksum: string
        PropertyList: PropertyList
    }

    type MapsType<T> = Map<string, T>
}