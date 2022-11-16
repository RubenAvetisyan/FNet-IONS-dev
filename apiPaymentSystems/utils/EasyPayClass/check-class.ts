import md5 from 'md5'
import type { H3Error } from 'h3'
import { createError } from 'h3'
import { easyPay } from '../paymentSystems'
import { aBilling } from '@/Config'
import { SuccessResposeType, PropertyList, RequestType } from '~~/nuxt'
import { Easypay } from '.'

export class Check extends Easypay {
  private ERROR: H3Error
  private TOKEN: string

  constructor() {
    super()
    this.TOKEN = super.getToken()
    this.ERROR = createError('')
  }

  setChecksum(JOINED_INPUTS_AS_STRING: string, LANG: string) {
    return md5(this.TOKEN + JOINED_INPUTS_AS_STRING + LANG)
  }

  compareChecksum(CHECKSUM: string, REQUEST_CHECKSUM: string) {
    return CHECKSUM === REQUEST_CHECKSUM
  }

  createChecksum(...args: any[]) {
    return md5(args.join(''))
  }

  parsArrayObjToString(arr: any[] | string) {
    if (!Array.isArray(arr))
      return

    return JSON.stringify(arr)
  }

  setSuccesResult(data: SuccessResposeType) {
    const {
      CLIENT_NAME,
      BALANCE,
      CONDTRACT_ID,
    } = data

    const PROPEARTY_LIST = [
      { key: 'Բաժանորդ', value: CLIENT_NAME },
      { key: 'Հաշվի մնացորդ', value: BALANCE },
      { key: 'Բաժանորդային համար', value: CONDTRACT_ID },
    ]
    const PROPEARTY_LIST_AS_STRING = this.parsArrayObjToString(PROPEARTY_LIST)
    const OUT_CHECKSUM = this.createChecksum(this.TOKEN, PROPEARTY_LIST_AS_STRING)
    const RESPONSE = super.getOption('successResponse')
    RESPONSE.Checksum = OUT_CHECKSUM
    RESPONSE.PropertyList = PROPEARTY_LIST

    return RESPONSE
  }

  async result(request: RequestType) {
    try {
      const REQUEST_CHECKSUM = request.Checksum
      const REQUEST_INPUTS = request.Inputs
      const JOINED_INPUTS_AS_STRING = REQUEST_INPUTS.join('')
      const LANG = request.Lang
      const CHECKSUM = this.setChecksum(JOINED_INPUTS_AS_STRING, LANG)

      if (this.compareChecksum(CHECKSUM, REQUEST_CHECKSUM)) {
        this.ERROR = createError(super.setResponse('errorResponse', {
          Checksum: CHECKSUM,
          PropertyList: [{
            key: 'Բաժանորդ',
            value: '',
          }, {
            key: 'Բաժանորդային համար',
            value: REQUEST_INPUTS[0],
          }] as PropertyList[],
        }))
        return this.ERROR
      }

      const CONTRACT_ID = REQUEST_INPUTS[0]
      const { data, isError } = await aBilling.getContract(CONTRACT_ID, 'easypay', LANG, REQUEST_CHECKSUM)

      if (isError) { // PARSED_CONTRACT?.data?.$?.status === 'error'
        const ERROR: any = { ...data }

        ERROR.PropertyList = null

        return ERROR
      }

      return this.setSuccesResult(data as SuccessResposeType)
    }
    catch (error: unknown) {
      console.log('error: ', error)
      return error instanceof createError ? createError(error) : `unknown Error: ${JSON.stringify(error)}`
    }
  }
}
