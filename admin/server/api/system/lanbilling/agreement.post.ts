// import { $fetch } from 'ofetch';
import { readBody, createError } from 'h3';
import { Agreements } from '~/admin/server/utils/API/agreement-class'

export default defineEventHandler(async (event) => {
  try {
    const { uid } = await readBody(event) as { uid: number }
    if (!uid) throw createError('account id was not defined "uid"')
    const agreement = new Agreements('http://10.120.2.22:34012')
    const user = await agreement.login('Ruben', 'Ruben1234')

    const res = await agreement.getAgreements()
    // console.log('res: ', res);

    return res
  } catch (error: any) {
    console.log('error: ', error.message);
    throw createError(error);

  }
})
