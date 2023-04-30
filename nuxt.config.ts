import { resolve } from 'path';
import { readFileSync } from 'fs';
import chalk from 'chalk'
import * as flowbite from 'flowbite'
import { log } from './utils/log'
import { prisma } from './server/api/db'
import { description } from './package.json'
import { addComponent } from '@nuxt/kit'

const sslKeyFile = process.env.NITRO_SSL_KEY;
const sslCertFile = process.env.NITRO_SSL_CERT

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
    '@nuxt/devtools',
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

  devtools: {
    // Enable devtools (default: true)
    enabled: false,
    // VS Code Server options
    // vscode: {},
    // ...other options
  },

  auth: {
    enableGlobalAppMiddleware: true,
    origin: process.env.NUXT_AUTH_ORIGIN,
    // addDefaultCallbackUrl: '/user/statements/totalClients',
    basePath: '/api/auth/',
    // ...(process.env.NODE_ENV === 'production' && { origin: process.env.NUXT_AUTH_ORIGIN })
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

    // public: {
    //   baseUrl: 'http://ions.fnet.am'
    // },

    isTest: process.env.NUXT_IS_TEST || 'false',
    AUTH_ORIGIN: process.env.NUXT_AUTH_ORIGIN,
    authSecret: process.env.NUXT_AUTH_SECRET,
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
    preset: 'node-server',
  },

  // vite: {
  //   server: {
  //     hmr: {
  //       protocol: 'wss',
  //       clientPort: 443,
  //       path: "hmr/"
  //     },
  //     https: {
  //       key: sslKeyFile ? readFileSync(resolve(__dirname, sslKeyFile)) : undefined,
  //       cert: sslCertFile ? readFileSync(resolve(__dirname, sslCertFile)) : undefined,
  //     },
  //     cors: true,
  //   },
  // }

  vite: {
    server: {
      hmr: {
        protocol: 'wss'
      },
      https: {
        key: sslKeyFile ? readFileSync(resolve(__dirname, sslKeyFile)) : undefined,
        cert: sslCertFile ? readFileSync(resolve(__dirname, sslCertFile)) : undefined,
      },
    }
  }

})
