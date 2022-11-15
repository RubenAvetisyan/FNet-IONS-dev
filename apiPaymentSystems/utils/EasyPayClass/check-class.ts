import md5 from 'md5'
import { createError, H3Error } from 'h3'
import { aBilling, easypay } from '../Config'
import { type } from 'os'
import { PaymentSystem } from '../PaymentSystemClass'


export class Check {
    private ERROR: H3Error
    private instance: PaymentSystem
    private TOKEN: string


    constructor() {
        this.instance = easypay
        this.TOKEN = this.instance.getToken()
        this.ERROR = createError('')
    }

    setChecksum(JOINED_INPUTS_AS_STRING: string, LANG: string) {
        return md5(this.TOKEN + JOINED_INPUTS_AS_STRING + LANG)
    }

    compareChecksum(CHECKSUM: string, REQUEST_CHECKSUM: string) {
        if (CHECKSUM !== REQUEST_CHECKSUM) {
            const ERROR_RESPONSE = {
                name: 'paymnet.fnet.am/check',
                statusCode: 401,
                statusMessage: 'It is necessary to check the validity conditions',
                data: {
                    ResponseMessage: 'Գործողությունը արգելված է',
                    ResponseCode: 1,
                    Debt: 0,
                    Checksum: REQUEST_CHECKSUM,
                    PropertyList: REQUEST_INPUTS,
                },
            }

            logger('check', PAYMENT_SYSTEM_NAME, {
                status: 'error',
                data: ERROR_RESPONSE
            })

            return createError(ERROR_RESPONSE)
        }
    }
    async result(body) {
        try {
            const REQUEST_CHECKSUM = body.Checksum
            const REQUEST_INPUTS = body.Inputs
            const JOINED_INPUTS_AS_STRING = REQUEST_INPUTS.join('')
            const LANG = body.Lang

            const CHECKSUM = this.setChecksum(JOINED_INPUTS_AS_STRING, LANG)

            if (CHECKSUM !== REQUEST_CHECKSUM) {
                const ERROR_RESPONSE = {
                    name: 'paymnet.fnet.am/check',
                    statusCode: 401,
                    statusMessage: 'It is necessary to check the validity conditions',
                    data: {
                        ResponseMessage: 'Գործողությունը արգելված է',
                        ResponseCode: 1,
                        Debt: 0,
                        Checksum: REQUEST_CHECKSUM,
                        PropertyList: REQUEST_INPUTS,
                    },
                }

                logger('check', PAYMENT_SYSTEM_NAME, {
                    status: 'error',
                    data: ERROR_RESPONSE
                })

                const body = await $fetch(BASE_URL + PAYMENT_SYSTEM_NAME + '/' + type, {
                    method: 'POST',
                    body: JSON.stringify(ERROR_RESPONSE)
                })

                return createError(ERROR_RESPONSE)
            }

            const CONTRACT_ID = REQUEST_INPUTS[0]
            const res = await getContract(CONTRACT_ID, PAYMENT_SYSTEM_NAME)
            const PARSED_CONTRACT = await xmlParser(res.body, LANG) // await parser.parseStringPromise(res.body)

            if (PARSED_CONTRACT.ERROR) { // PARSED_CONTRACT?.data?.$?.status === 'error'
                PARSED_CONTRACT.ERROR.Checksum = REQUEST_CHECKSUM
                PARSED_CONTRACT.ERROR.PropertyList = REQUEST_INPUTS
                logger('check', PAYMENT_SYSTEM_NAME, {
                    status: 'error',
                    data: PARSED_CONTRACT.ERROR
                })
                return PARSED_CONTRACT.ERROR
            }

            const {
                CLIENT_NAME,
                BALANCE,
                CONDTRACT_ID
            } = PARSED_CONTRACT

            const DEBT = parseFloat(PARSED_CONTRACT.DEBT).toFixed(2)
            const PROPEARTY_LIST = [
                { key: 'Բաժանորդ', value: CLIENT_NAME },
                { key: 'Հաշվի մնացորդ', value: BALANCE },
                { key: 'Բաժանորդային համար', value: CONDTRACT_ID }
            ]
            const PROPEARTY_LIST_AS_STRING = parsArrayObjToString(PROPEARTY_LIST)
            const OUT_CHECKSUM = md5(TOKEN + PROPEARTY_LIST_AS_STRING)
            const RESPONSE = {
                ResponseMessage: 'Գործողությունը թույլատրված է',
                ResponseCode: 0,
                Debt: DEBT,
                Checksum: OUT_CHECKSUM,
                PropertyList: PROPEARTY_LIST,
            }
            logger('check', PAYMENT_SYSTEM_NAME, {
                status: 'ok',
                data: RESPONSE
            })
            return RESPONSE
        }
        catch (error) {
            console.log('error: ', error);
            return createError(error)
        }
    }
}