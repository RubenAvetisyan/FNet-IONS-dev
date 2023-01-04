import { Context, Markup, Telegraf } from 'telegraf'
import { MaybeArray } from 'telegraf/typings/util'
import { Update, Message } from 'typegram'
import { log } from '../log'
import { Bot } from './bot'
import { BotDbMethod } from './bot-db-methods'

type Awaited<T> = T extends PromiseLike<infer U> ? U : T
type Fn = (arg?: any) => void

const keyboard = Markup.inlineKeyboard([
    Markup.button.login("Login", "https://erp.fnet.am/user/", {
        bot_username: "fnetIoSystemBot",
        request_write_access: true,
    }),
    // Markup.button.url("❤️", "http://telegraf.js.org"),
    // Markup.button.callback("Delete", "delete"),
]);

export class Controller {
    instance: Bot
    dbMethods: BotDbMethod
    categories: Map<string, any[]>
    constructor(instance: Bot) {
        this.instance = instance
        this.dbMethods = new BotDbMethod()
        this.setDefaultCommands()
        this.categories = new Map()
    }

    init() {
        this.categories.set('keyboard', [])
        this.categories.set('command', [])
        this.categories.set('keyboard', [])
    }

    get bot() {
        return this.instance.bot
    }

    callbackHandler(callback: Fn, feedback_message?: string) {
        return async (ctx: Context) => {
            callback(ctx)

            if (feedback_message) {
                return ctx.reply(feedback_message)
            }
        }
    }

    #registerCommand(commandName: MaybeArray<string>, callback: () => any, feedback_message?: string) {
        this.bot.command(commandName, this.callbackHandler(callback, feedback_message))
    }

    #idValid(isCommandNames: boolean, isCallbacks: boolean, commandNames: string | string[], callbacks: Fn | Fn[]) {
        return (!isCommandNames && isCallbacks) || (isCommandNames && !isCallbacks)
            || (isCommandNames && isCallbacks && commandNames.length !== callbacks.length)
    }

    registerCommands(
        commandNames: string | string[],
        callbacks: Fn | Fn[],
        feedback_message?: string
    ) {
        const isCommandNames = Array.isArray(commandNames)
        const isCallbacks = Array.isArray(callbacks)

        const isInvalid = this.#idValid(isCommandNames, isCallbacks, commandNames, callbacks)
        if (isInvalid) {
            log('isInvalid: ', isInvalid);
            throw new Error()
        }

        if (!isCommandNames && !isCallbacks)
            this.#registerCommand(commandNames, callbacks, feedback_message)
        else {
            [...commandNames].forEach((commandName, i) => {
                if (!isCallbacks) return
                this.#registerCommand(commandName, callbacks[i], feedback_message)
            })
        }

    }

    setDefaultCommands() {
        this.registerCommands(['quit', 'start', 'register'], [
            (ctx: Context) => {
                if (ctx.chat?.type !== 'private')
                    ctx.leaveChat();
                else
                    ctx.reply('This is a private chat. You can\'t changed its status...')
            }, async (ctx: any) => {
                console.log('ctx: ', ctx);
                const user = await this.dbMethods.getOrCreateUser(ctx)
                // log('user in start: ', user);
                const defaultMessage = 'start' // `Hello ${user?.username ? user.username : user?.last_name}, welcome to ${ctx.me}`
                return ctx.reply(defaultMessage, keyboard)
            }, async (ctx: any) => {
                log('ctx: ', ctx);
                // this.setNewMembwer()
                return ctx.reply('defaultMessage')
            }
        ], 'Request Done')
    }
}