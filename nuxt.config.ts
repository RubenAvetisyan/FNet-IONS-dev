import chalk from 'chalk'
import * as flowbite from 'flowbite'
import { log } from './utils/log'
import { prisma } from './server/api/db'
import { description } from './package.json'
import { addComponent } from '@nuxt/kit'

process.on('SIGINT', async (signal) => {
  if (signal === 'SIGINT') {
    await prisma.$disconnect()
    log(`${signal.toUpperCase()}:`, chalk.underline.green('prisma has been disconnected'))
    import('./admin/utils/ABilling/abilling-connection').then(({ connection }) => connection.close())
    import('./admin/utils/LanBilling/lanbilling-connection').then(({ connection }) => connection.close())
    import('./admin/utils/ERP/erp-connection').then(({ connection }) => connection.close())
  }
})

const host = process.env.HOST
const port = process.env.PORT

type DbConfig = {
  host: string;
  port: string;
  user: string;
  password: string;
  database: string;
  insecureAuth: boolean;
};

const setDbConfig = (db: string, dbName?: string, insecureAuth: boolean = true): DbConfig => {
  const DB = db.toUpperCase()
  const port = process.env[`NUXT_DB_${DB}_PORT`] || '3306'
  return {
    host: process.env[`NUXT_DB_${DB}_HOST`] || '',
    port: port,
    user: process.env[`NUXT_DB_${DB}_LOGIN`] || '',
    password: process.env[`NUXT_DB_${DB}_PASSWORD`] || '',
    database: process.env[`NUXT_DB_${DB || dbName}_NAME`] || '',
    insecureAuth
  }
}

const lanbilling: DbConfig = setDbConfig('LanBilling', 'billing')
const abilling: DbConfig = setDbConfig('ABilling', 'billing', false);

export default defineNuxtConfig({
  extends: [
    './admin',
    './apiPaymentSystems',
    './log',
    // 'github.com:RubenAvetisyan/BGBilling.git'

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
    keepalive: true,
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/color-mode',
    '@sidebase/nuxt-auth',
    // ['./modules', {
    //   botToken: process.env.NUXT_BOT_TOKEN || '',
    // }],
    function () {
      for (const name of Object.keys(flowbite)) {
        if (name.match(/^[A-Z]/)) {
          addComponent({
            export: name,
            filePath: 'flowbite',
            name
          })
        }
      }
    }
  ],
  auth: {
    origin: process.env.ORIGIN || 'http://' + host + ':' + port,
    enableGlobalAppMiddleware: false,
    globalMiddlewareOptions: {
      allow404WithoutAuth: false,
    }
  },

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

  css: ['~/assets/index.css'],

  imports: {
    dirs: ['config', 'utils'],
  },

  runtimeConfig: {
    isTest: process.env.NUXT_IS_TEST || 'false',
    AUTH_ORIGIN: process.env.NUXT_AUTH_ORIGIN,
    authSecret: description,
    dbConfigs: {
      lanbilling,
      abilling,
      erp: setDbConfig('ERP')
    },
    telegram: {
      botToken: '',
    },
  },

  hooks: {
    close: async () => {
      try {
        await prisma.$disconnect()
      }
      catch (error: any) {
        global.console.warn('error: ', chalk.underline.red(error?.message || error), error.stuck || '')

        process.exit(1)
      }
    },
  },

  nitro: {
    preset: 'node-cluster',
  },

  // vite: {
  //   server: {
  //     hmr: {
  //       host: 'localhost',
  //       protocol: "ws",
  //       clientPort: 80,
  //       path: "hmr/",
  //     },
  //     https: false
  //   },
  // }

  // reactStrictMode: true,
  // swcMinify: true,

})
