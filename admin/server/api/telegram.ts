import httpsProxyAgent from 'https-proxy-agent'
import { Bot, Controller } from '@/utils/Telegram'

const { telegram } = useRuntimeConfig()
console.log('botToken: ', telegram.botToken)

const HttpsProxyAgent = httpsProxyAgent.HttpsProxyAgent
const agent = new HttpsProxyAgent({
  host: 'localhost',
  port: 3001,
})

const botOtions = {
  telegram: { agent, attachmentAgent: agent },
}

const botInstance = new Bot(process.env.NUXT_BOT_TOKEN || '')

const tBot = new Controller(botInstance)

// try {
//     botInstance.bot.launch().then(() => {
//         botInstance.bot.stop('123')
//     })
// } catch (error) {
//     console.error('error: ', error)
// }
botInstance.bot.launch({
  dropPendingUpdates: true,
})
export default defineEventHandler(async (event) => {
  try {
    const res = { info: 'botInstance.auth()' }
    // telegram.bot.stop()
    return res
  }
  catch (error) {
    console.log('error: ', error)
    return null
  }
})
