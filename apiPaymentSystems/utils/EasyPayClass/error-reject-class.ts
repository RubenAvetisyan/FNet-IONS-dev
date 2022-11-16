export abstract class CheckResponseWithError {
    name: 'paymnet.fnet.am/check',
    statusCode: 401,
    statusMessage: 'It is necessary to check the validity conditions',
    data: {
        ResponseMessage: 'Գործողությունը արգելված է',
        ResponseCode: 1,
        Debt: number,
        Checksum: string,
        PropertyList: PropertyList,
    }
}

type ErrorTypeDef = Map<string, any>

class ErrorType {
    errorTpes: ErrorTypeDef
    constructor() {
        this.errorTpes = new Map()
    }

    addErrorType<K extends string, V>(errorTypename: K, description: V): void {
        this.errorTpes.set(errorTypename, description)
    }

    getErrorType(errorTypename: string): any {
        return this.errorTpes.get(errorTypename)
    }
}