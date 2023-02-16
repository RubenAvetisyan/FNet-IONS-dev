import { Markup } from 'telegraf'
import type Context from 'telegraf/typings/context'
import { getUserFormTelegramBot } from '../../server/api/db/telegram-user'
import { errorLog, log } from '../log'

export class BotDbMethod {
  constructor() { }
  async getOrCreateUser(context: Context) {
    try {
      const id = context.message?.from.id
      console.log('id: ', id)
      if (!id)
        return context.reply('Something goes wrong')

      const user = await getUserFormTelegramBot(id)
      log('user: ', user)

      if (user) {
        return user
      }
      else {
        const MSG = 'խնդրում ենք մուտք գործել համակարգ: Կատարեք ստորև նշված քայլերը'
        context.reply(MSG, Markup.inlineKeyboard([
          Markup.button.callback('login', 'LOGIN'),
        ]))
      }
    }
    catch (error) {
      errorLog(error)
    }
  }
}
