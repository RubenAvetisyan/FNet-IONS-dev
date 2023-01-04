import { Bot, Controller } from '../utils/Telegram/index'

export const telegramBot = (BOT_TOKEN: string) => new Controller(new Bot(BOT_TOKEN))