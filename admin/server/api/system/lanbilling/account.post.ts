// import { $fetch } from 'ofetch';
import { readBody, createError } from 'h3';
import { Account } from '~/admin/server/utils/API/account-class'

export default defineEventHandler(async (event) => {
  try {

    const { uid } = await readBody(event) as { uid: number }
    if (!uid) throw createError('account id was not defined "uid"')
    const account = new Account('http://10.120.2.22:34012/?wsdl')
    await account.init()
    const user = await account.login('Ruben', 'Ruben1234')

    // const res = await account.getAccounts()
    // console.log('res: ', res);

    return user
  } catch (error: any) {
    console.log('error: ', error.message);
    throw createError(error);

  }
})
