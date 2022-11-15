type AbillingERROR = {
    statusCode: number
    message: {
        hy: string
        ru: string
        en: string
    }
}

class AbillingErrorStatusCode {
    errors: Map<number, AbillingERROR>
    constructor() {
        this.errors = new Map([
            [1, {
                statusCode: 401,
                message: {
                    hy: 'Մուտքանունը չի գտնվել',
                    ru: 'Логин не наден',
                    en: 'Login not valid',
                }
            }],
            [2, {
                statusCode: 401,
                message: {
                    hy: 'Սխալ գախտնաբառ',
                    ru: 'Неверный пароль!',
                    en: 'Wrong password!',
                }
            }],
            [3, {
                statusCode: 400,
                message: {
                    hy: 'Պարամետրերը բացակայում են կամ անվավեր են',
                    ru: 'Отсутствуют и/или не правильные параметры',
                    en: 'Missing and/or incorrect parameters',
                }
            }],
            [4, {
                statusCode: 408,
                message: {
                    hy: 'Ակտիվության շրջանի ավարտ։',
                    ru: 'Вы вне периода активности!',
                    en: 'You\'re out of activity!',
                }
            }],
            [5, {
                statusCode: 403,
                message: {
                    hy: 'Ձեր IP հասցեից հարցումներն արգելափակված են։',
                    ru: 'Доступ с Вашего IP адреса запрещен.',
                    en: 'Access denied from your IP address.',
                }
            }],
            [6, {
                statusCode: 429,
                message: {
                    hy: 'Անհաջող միացումների քանակը գերազանցված է։ Մուտքն արգելափավեած է։',
                    ru: 'Превышен лимит неудачных попыток подключения. Логин заблокирован.',
                    en: 'The limit of failed connection attempts has been exceeded. Login blocked.',
                }
            }],
            [7, {
                statusCode: 403,
                message: {
                    hy: 'Նշված action դաշտը սխալ է լրացված։',
                    ru: 'Указанный action не найден',
                    en: 'The specified action was not found',
                }
            }],
            [8, {
                statusCode: 404,
                message: {
                    hy: 'Հաճախորդը չի գտնվել։',
                    ru: 'Клиент не найден',
                    en: 'Client not found',
                }
            }],
            [9, {
                statusCode: 400,
                message: {
                    hy: 'Որոնման վավերապայմաններն անհրաժեշտ է հստակեցնել։',
                    ru: 'Уточните условия поиска',
                    en: 'Specify search terms',
                }
            }],
            [10, {
                statusCode: 409,
                message: {
                    hy: 'Այսպիսի վճարման համար արդեն գոյություն ունի:',
                    ru: 'Такой номер платежа уже есть!',
                    en: 'This payment number already exists!',
                }
            }],
            [11, {
                statusCode: 404,
                message: {
                    hy: 'Վճարումը չի գտնվել:',
                    ru: 'Платеж не найден!',
                    en: 'Payment not found!',
                }
            }],
            [12, {
                statusCode: 444,
                message: {
                    hy: 'Վճարումն արդեն չեղարկվել է:',
                    ru: 'Платеж уже отменен!',
                    en: 'Payment already canceled!',
                }
            }],
            [13, {
                statusCode: 408,
                message: {
                    hy: 'Վճարումը չեղարկելու ժամանակը սպառվել է:',
                    ru: 'Время для отмены платежа вышло!',
                    en: 'Time to cancel payment is up!',
                }
            }],
        ])
    }
}

type ABillingParamKey = "findContract" | "addPayment" | string

type FindContract = {
    action: string
    mid: number // expecting the module index of external payment in ABilling system '3'. Other numbers of index are invalid...
    contract_title_1: string // client Contract ID
    accurate: boolean // 'false' is making the request invalid
}

type AddPayment = {
    action: string // expecting the module index of external payment in ABilling system '3'. Other numbers of index are invalid...
    cid: string // client ID
    trans: string // transaction id
    comment: string // usually The payment system NAME
    mid: number
    summ: number // amount of money
}

type ABillingParam = FindContract | AddPayment

type CredentialType = {
    user: string
    passowrd: string
    [key: string]: any
}

type DefaultCredentialKey = 'easyPay' | 'idram' | 'tellcell' | 'mobidram'


class Credential {
    private readonly _credentials: Map<DefaultCredentialKey | string, CredentialType>
    constructor() {
        this._credentials = new Map([
            ['easyPay', {
                user: 'onediller',
                passowrd: '2VzWASS9',
            }],
            ['idram', {
                user: 'twodiller',
                passowrd: '2VzWASS9',
            }],
            ['tellcell', {
                user: 'threediller',
                passowrd: '2VzWASS9',
            }]
        ])
    }

    add(key: string, value: CredentialType) {
        this._credentials.set(key, value)
    }

    get credentials() {
        return this._credentials
    }

    getCredKeyTypes() {
        const cred = this._credentials.keys()
        return class Cred {
            keys: IterableIterator<string>
            constructor() {
                this.keys = cred
            }
        }
    }
}

class Param {
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
            comment: ''
        },]
    ])

    addParam(key: string, value: ABillingParam) {
        this.params.set(key, value)
    }
}

export class ABilling {
    billingCred = new Credential()
    billingParams = new Param()
    errors = new AbillingErrorStatusCode()
    credentials: Map<string, CredentialType>
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
}