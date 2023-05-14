// import { $fetch } from 'ofetch';
import { readBody, createError } from 'h3';
import { Agreements } from '~/admin/server/utils/API/agreement-class'

export default defineEventHandler(async (event) => {
  try {
    const fetchWrapper: HttpClient = {
      post: async (url: string, body: any, options: any = {}) => {
        const requestOptions = {
          method: 'POST' as 'POST',
          body: body,
          headers: { 'Content-Type': 'text/xml;charset=UTF-8' }
        }

        if (options) {
          if (options.headers) {
            requestOptions.headers = {
              ...requestOptions.headers,
              ...options.headers
            };
          }

          const otherOptions = { ...options };
          delete otherOptions.headers;

          Object.assign(requestOptions, otherOptions);
        }

        const response = await $fetch.raw(url, requestOptions)

        const cookies = (response.headers.get('set-cookie') || '').split(',')

        const data = response._data; // или response.json(), если ответ в формате JSON
        return {
          data,
          headers: response.headers, // теперь headers также возвращаются
          cookies
        };
      }
    }

    const { uid } = await readBody(event) as { uid: number }
    if (!uid) throw createError('account id was not defined "uid"')
    const agreement = new Agreements('http://10.120.2.22:34012', fetchWrapper)
    const user = await agreement.login('Ruben', 'Ruben1234')

    const res = await agreement.getAgreements()
    // console.log('res: ', res);

    return res
  } catch (error: any) {
    console.log('error: ', error.message);
    throw createError(error);

  }
})
