// import { $fetch } from 'ofetch';
import { readBody, createError } from 'h3';
import { Account } from '~/admin/server/utils/API/account-class'

export default defineEventHandler(async (event) => {
  try {

    const { uid } = await readBody(event) as { uid: number }
    if (!uid) throw createError('account id was not defined "uid"')
    const account = new Account('http://10.120.2.22:34012')
    const user = await account.login('Ruben', 'Ruben1234')

    const res = await account.getAccount(uid)
    // console.log('res: ', res);

    return res
  } catch (error: any) {
    console.log('error: ', error.message);
    throw createError(error);

  }
})
