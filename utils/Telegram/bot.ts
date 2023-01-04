import type { Message, Update } from 'typegram'
import { $fetch } from 'ofetch'
import { errorLog, dividerLog, log } from '../../utils/log';
import { Context, Markup, Middleware, NarrowedContext, Telegraf, session } from 'telegraf'
import { getUserFormTelegramBot, upsertTelegramBotUser } from '../../server/api/db/telegram-user'
import { SceneRegistrer } from './scene';
import { normalizeMessage } from './helpers';

const commandArgs = () => (ctx: any, next: Function) => {
  console.log('ctx: ', ctx);
  if (ctx.updateType === 'message' && ctx.updateSubType === 'text') {
    const text = ctx.update.message.text.toLowerCase();
    console.log('text: ', text);
    if (text.startsWith('/')) {
      const match = text.match(/^\/([^\s]+)\s?(.+)?/);
      let args = [];
      let command;
      if (match !== null) {
        if (match[1]) {
          command = match[1];
        }
        if (match[2]) {
          args = match[2].split(' ');
        }
      }

      ctx.state.command = {
        raw: text,
        command,
        args,
      };
    }
  }
  return next();
};

type ContextBody = {
  message: Update.New & Update.NonChannel & Message.TextMessage;
  update_id: number
} & Omit<Context<Update>, keyof Context<Update>>

type BotOption = Partial<Telegraf.Options<Context<Update>>> | undefined

type Callback = Middleware<NarrowedContext<Context<Update>, {
  message: Update.New & Update.NonChannel & Message.TextMessage;
  update_id: number;
}>>

export class Bot extends SceneRegistrer {
  bot
  constructor(BOT_TOKEN: string, options?: BotOption) {
    const tbot = new Telegraf(BOT_TOKEN, options)
    super(tbot)
    this.bot = tbot
    // this.bot.use(this.stageMiddleware())
    // this.bot.use(session())
    // this.bot.action('Register', ctx => {
    //   log('Register: ', ctx)
    // })

    // this.bot.start((ctx, next) => { ///^\/start.*/
    //   // Removes /start prefix
    //   console.log('ctx: ', ctx);
    //   console.log('start: ', ctx.startPayload)
    //   ctx.reply('Done')
    //   next()
    // })
    this.bot.use(Telegraf.log())
    this.bot.command('start', (ctx) => {
      console.log('command: ', ctx.state.command); // command object
    })
    this.bot.hears('/auth', ctx => {
      console.log('ctx: ', ctx)
    })

    // this.bot.start(ctx => {
    //   log('Deep link payload...')
    //   ctx.reply(`Deep link payload: ${ctx.startPayload}`)
    // })
    // this.login()
    this.onCrash()
  }

  onCrash() {
    process.once('SIGINT', () => this.stop('SIGINT'))
    process.once('SIGTERM', () => this.stop('SIGTERM'))
  }

  addMember(userId: string, context: Context<ContextBody>) {
    const { id: tg_id, is_bot, first_name, last_name, username } = context.message?.from || context.update?.message.from
    return upsertTelegramBotUser(userId, {
      tg_id,
      is_bot,
      is_active: false,
      first_name,
      last_name,
      username,
      bot_name: context.me,
    })
  }

  async sendMessage(tg_id: number, message: string, isHTML: boolean = true) {
    try {
      await this.bot.telegram.sendMessage(
        tg_id,
        normalizeMessage(message),
        {
          parse_mode: 'MarkdownV2',
          disable_web_page_preview: isHTML,
        }
      )
    }
    catch (error) {
      errorLog(error)
    }
  }

  onText() {
    this.bot.on('text', async (ctx) => {
      // const user = await this.getOrCreateUser(ctx)
      if (ctx.message.text.includes('Hi')) ctx.reply('Hi ' + ctx.message.from['first_name'])
    })
  }

  registerReferral(txt: any) {
    log('token: ', txt)
  }

  // auth() {
  //   this.bot.hears(/^\/start[ =](.+)$/, (ctx) => {
  //     this.registerReferral(ctx.match[1])
  //     ctx.reply('You\'r successfully authorized')
  //   })

  //   return 'Auth method has been registered'
  // }

  // login() {
  //   this.setWizardScene('login',
  //     this.wizardStep("Անհրաժեշտ է լրացնել ERP համակարգում Ձեր մուտքանունը"),
  //     this.wizardStep("Անհրաժեշտ է լրացնել ERP համակարգում Ձեր գաղտնաբառ",
  //       (ctx: any) => ctx.wizard.state.user = ctx.message.text),
  //     this.wizardStep(
  //       (ctx: any, id: string) => `Hi ${ctx.from.first_name} ${ctx.from.last_name || ''} your ID is ${id}`,
  //       async (ctx: any) => {
  //         try {
  //           const userName = ctx.message.text; // retrieve partner name from the message which user entered
  //           const password = ctx.wizard.state.user; // retrieve your name from state
  //           const res = await $fetch('http://localhost:3001/api/auth', {
  //             method: 'POST',
  //             body: { user: userName, password }
  //           })

  //           const { id } = res

  //           let user = null
  //           if (id) {
  //             user = await this.addMember(id, ctx)
  //           }
  //           log('user in login: ', user);

  //           ctx.reply(
  //             `Hi ${user?.first_name} ${user?.last_name || ''} your ID is ${id}`,
  //             Markup.inlineKeyboard([
  //               Markup.button.callback("login again", "LOGIN")
  //             ])
  //           )
  //           return ctx.scene.leave();
  //         } catch (error: any) {
  //           ctx.reply(error?.message || 'SomeError',
  //             Markup.inlineKeyboard([
  //               Markup.button.callback("login", "LOGIN")
  //             ]))
  //         }
  //       }
  //     )
  //   )
  // }

  async launch() {
    return this.bot.launch()
  }

  stop(signal: string) {
    try {
      this.bot.stop(signal)
    } catch (error) {
      errorLog(error)
    }
  }
}

