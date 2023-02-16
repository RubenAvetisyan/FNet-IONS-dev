import { addPlugin, createResolver, defineNuxtModule, logger } from '@nuxt/kit'
import { dividerLog } from '../utils/log'
import { telegramBot } from './telegram-bot'

export interface ModuleOptions {
  botToken: string
}

export interface ModuleHooks {
  'telegram-bot:init': any
}

export interface ModulePublicRuntimeConfig {
  NAME: string
}

export interface ModulePrivateRuntimeConfig {
  PRIVATE_NAME: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtjs/telegram-bot',
    configKey: 'telegramBot',
    compatibility: {
      // Semver version of supported nuxt versions
      nuxt: '3.0.0',
    },
  },
  defaults: {
    botToken: '',
  },
  async setup(moduleOptions, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    const BOT_TOKEN = moduleOptions.botToken || nuxt.options.runtimeConfig.telegram.botToken || process.env.NUXT_BOT_TOKEN
    if (!BOT_TOKEN)
      throw new Error('BOT_TOKEN is not defined')
    dividerLog('***')
    logger.info('DEFINING TELEGRAM BOT...')
    // const botInstance = telegramBot(BOT_TOKEN)

    // addPlugin(resolve('./runtime/plugin.server'), { append: true })

    nuxt.hook('listen', async (_server: any, { port }: { port: number }) => {
      logger.info('port: ', port)
      try {
        dividerLog('***')
        // botInstance.bot.launch()
        logger.success('TELEGRAM BOT HAS BEEN LOUNCHED')
        dividerLog('---')
      }
      catch (error: any) {
        logger.error('build:before: controller.bot.launch()', error?.message)
      }
    })

    // nuxt.hook('close', () => {
    //     if (botInstance.bot.botInfo?.is_bot) {
    //         logger.info('Closing the TELEGRAM BOT')
    //         botInstance.bot.stop('close')
    //         dividerLog('---')
    //     }
    // })

    // nuxt.hook('app', (vueApp) => {
    //     logger.info('Closing the TELEGRAM BOT')
    //     bot.stop('close')
    //     logger.success('Telegram bot has been closed')
    //     dividerLog('***')
    // })
  },
})
