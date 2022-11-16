import type { AbillingERROR } from './abilling-error-class'
import { AbillingErrorStatusCode } from './abilling-error-class'
import { XmlParser } from '~~/utils/parser-class'

export class Parser {
  parser = new XmlParser()
  ERRORS = new AbillingErrorStatusCode()

  createError(ERROR_CODE: string | number, MESSAGE: string, REQUEST_CHECKSUM: string): parseTheType<ErrorsResposeType> {
    const result: parseTheType<ErrorsResposeType> = {
      status: 'error',
      data: {
        ResponseMessage: MESSAGE,
        ResponseCode: +ERROR_CODE | 1,
        Debt: 0,
        Checksum: REQUEST_CHECKSUM,
      },
      isError: true,
    }

    return result
  }

  async xmlParser(
    xml: string,
    REQUEST_LANGUAGE: 'hy' | 'ru' | 'en',
    REQUEST_CHECKSUM: string,
  ): Promise<parseTheType<SuccessResposeType | ErrorsResposeType>> {
    const PARSED_DATA = await this.parser.parseThe(xml) as { data: any }

    if (PARSED_DATA?.data?.$?.status === 'error') {
      const ERROR_CODE = PARSED_DATA.data.$.error_code as string
      const ABILLING_ERROR = this.ERRORS.getError(ERROR_CODE) as AbillingERROR
      const MESSAGE = ABILLING_ERROR.message[REQUEST_LANGUAGE]

      return this.createError(ERROR_CODE, MESSAGE, REQUEST_CHECKSUM)
    }

    const CONTRACT = PARSED_DATA.data?.contract[0].$ as SuccessResposeConractType
    const CLIENT_NAME = CONTRACT.comment
    const CONDTRACT_ID = CONTRACT.title
    const DEBT = CONTRACT.serviceSumma
    const BALANCE = CONTRACT.balance
    const CLIENT_ID = CONTRACT.id

    const result: parseTheType<SuccessResposeType> = {
      status: 'done',
      data: {
        CONTRACT, CLIENT_ID, CLIENT_NAME, CONDTRACT_ID, DEBT, BALANCE,
      },
      isError: false,
    }

    return result
  }
}
