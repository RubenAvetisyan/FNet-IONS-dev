


export enum StatusCode {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  RequestTimeout = 408,
  Conflict = 409,
  TooManyRequests = 429,
  NoResponse = 444,
}
const messageLanguage = ['hy', 'ru', 'en'] as const
export type MessageLanguage = typeof messageLanguage[number]
type DefaultCheckBody = {
  "Checksum": string,
  "Inputs": string[],
  "Currency": string,
  "Lang": MessageLanguage
}

type PaymentRequestBody = {
  Checksum: string,
  Inputs: string[],
  Amount: number,
  TransactID: string,
  isTest?: boolean,
};

export default defineEventHandler(async event => {
  const { action } = getQuery(event)

  try {
    // const BODY = await readBody(event);
    // const result = action === 'check'
    //   ? await fnetPayCheck(BODY as DefaultCheckBody)
    //   : await fnetPayPayment(BODY as PaymentRequestBody);
    // return result;
  } catch (error: unknown) {
    console.log('error: ', error);
    return createError(error || 'Something goes wrong');
  }
})
