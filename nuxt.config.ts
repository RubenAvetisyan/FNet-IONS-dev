import chalk from 'chalk'
import { prisma } from "./server/api/db"

process.on('SIGINT', async (signal) => {
  if (signal === 'SIGINT') {
    await prisma.$disconnect()
    console.log(signal.toUpperCase() + ':', chalk.underline.green('prisma has been disconnected'))
  }
})

export default defineNuxtConfig({
  extends: [
    './admin',
    './apiPaymentSystems',
    './log',
  ],
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=500, initial-scale=1',
      title: 'FNet Power system',
      meta: [
        { name: 'description', content: 'Internal operations implementation system' },
      ],
    },
    keepalive: true
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  experimental: {
    reactivityTransform: true,
  },
  unocss: {
    preflight: true,
    attributify: true,
    icons: true,
  },
  colorMode: {
    classSuffix: '',
  },

  imports: {
    dirs: ['config', 'utils'],
  },

  runtimeConfig: {
    isTest: process.env.NUXT_IS_TEST || 'false',
    lanbilling: {
      host: process.env.NUXT_DB_LanBilling_HOST,
      port: process.env.NUXT_DB_LanBilling_PORT,
      user: process.env.NUXT_DB_LanBilling_LOGIN,
      password: process.env.NUXT_DB_LanBilling_PASSWORD,
      database: process.env.NUXT_DB_LanBilling_NAME,
    },
    abilling: {
      host: process.env.NUXT_DB_ABilling_HOST,
      port: process.env.NUXT_DB_ABilling_PORT,
      user: process.env.NUXT_DB_ABilling_LOGIN,
      password: process.env.NUXT_DB_ABilling_PASSWORD,
      database: process.env.NUXT_DB_ABilling_NAME,
    },
    erp: {
      host: process.env.NUXT_DB_ERP_HOST,
      port: process.env.NUXT_DB_ERP_PORT,
      user: process.env.NUXT_DB_ERP_LOGIN,
      password: process.env.NUXT_DB_ERP_PASSWORD,
      database: process.env.NUXT_DB_ERP_NAME,
    },
  },

  hooks: {
    'close': async (nuxt) => {
      try {
        await prisma.$disconnect()
      } catch (error: any) {
        console.warn('error: ', chalk.underline.red(error?.message || error), error.stuck || '')

        process.exit(1)
      }
    }
  }

  // reactStrictMode: true,
  // swcMinify: true,

})
