import type { Ref } from 'vue'
import { z } from 'zod'

export const erpCustomersSchema = z.object({
    header: z.array(z.string()),
    body: z.array(z.object({
        city: z.string().optional().nullable(),
        street: z.string().optional().nullable(),
        quarter: z.string().optional().nullable(),
        house: z.string().optional().nullable(),
        contract: z.string(),
        agreementDate: z.string().optional(),
        customerName: z.string().optional(),
        phone: z.string().optional().nullable(),
        contractId: z.number().optional(),
        customerType: z.string().optional(),
    })).nonempty()
})

export { };

declare module 'lodash.intersection' {
    function intersection<T>(...arrays: T[][]): T[];
    export = intersection;
}

declare module 'mysql-schema';

declare global {

    type ERPContractNumbers = {
        contractNumber: string | number;
        customerName: string;
        region: string;
        city: string;
        quarter: string;
        street: string;
        house: string;
    }

    type ExecuteQuery<T> =
        | {
            header: string[];
            body: T[];
            FieldPackets: FieldInfo[] | undefined;
        }
        | H3Error

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
        DtTime: Date | string
        TransactID: number
        PaymentSystemName: string
    }

    type GetPaymentsResponseBody = {
        'Transaction ID': number;
        'Contract ID': string;
        User: string;
        'Payment sum': Number;
        P_TYPE: string;
        P_SYSTEM: string;
        Transaction: string;
        'Syncronization Date': string;
    }

    interface GetPaymentsResponse {
        header: string[];
        body: GetPaymentsResponseBody[];
        FieldPackets?: FieldInfo[] | undefined;
    }

    interface LanBilling {
        Inputs: string[]
        Amount: number
        TransactID: number
        Currency: string
        Checksum: string
        DtTime: Date | string
        PaymentSystemName?: string
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
        Inputs: string[]
        Amount: number
        TransactID: number
        Currency: 'AMD' | 'RUB' | 'USD'
        Checksum: string
        DtTime: string
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

    interface AuthResponse {
        id: number
        fullName: string
        roleId: number
        role: string
        description: string
        email: string
        groupId: number | number[]
        type: string
    }

    interface AuthResult {
        id: number
        fullName: string
        email: string
        type: string
        description: string
        groupId: number[]
    }

    type MapsType<T> = Map<string, T>

    interface TelegramUser {
        tg_id: number
        first_name?: string
        last_name?: string
        username?: string
        is_bot: boolean
        is_active?: boolean
        last_action?: string
        created_at?: Date
        bot_name?: string
    }

    type PropType<TObj, TProp extends keyof TObj> = TObj[TProp]

    interface QueryDate {
        dateFrom: string
        dateTo: string | undefined
    }

    type AdminStoreList = {
        type: string;
        name: string;
        icon?: string;
        href?: string;
        link?: string;
        direct?: string;
        sub?: AdminStoreList[]
    }

    type ErpCustomers = z.TypeOf<typeof erpCustomersSchema>;
}
