const { resolve } = require('path')
console.log('cwd: ', resolve(__dirname));

const currentDir = resolve(__dirname)
console.log('currentDir: ', currentDir);

module.exports = {
    apps: [
        {
            name: 'FNet IO SYSTEM',
            namespace: 'FNet',
            cwd: currentDir,
            exec_mode: 'cluster_mode',
            instances: -1,
            env: {
                NODE_ENV: "development",
                NITRO_PORT: 3001,
                NUXT_DB_LanBilling_HOST: '10.120.2.22',
                NUXT_DB_LanBilling_PORT: 3306,
                NUXT_DB_LanBilling_LOGIN: 'Ruben',
                NUXT_DB_LanBilling_PASSWORD: '',
                NUXT_DB_LanBilling_NAME: 'billing',
                NUXT_DB_ERP_HOST: '10.120.2.25',
                NUXT_DB_ERP_PORT: 3306,
                NUXT_DB_ERP_LOGIN: 'avetisyan_r',
                NUXT_DB_ERP_PASSWORD: 'Einei8uuboe0',
                NUXT_DB_ERP_NAME: 'erp',
                NUXT_DB_ABilling_HOST: '10.120.2.31',
                NUXT_DB_ABilling_PORT: 3306,
                NUXT_DB_ABilling_LOGIN: 'avetisyan_r',
                NUXT_DB_ABilling_PASSWORD: 'Einei8uuboe0',
                NUXT_DB_ABilling_NAME: 'billing',
            },
            script: './.nuxt/dev/index.mjs',
            watch: true,
            ignore_watch: ["[\/\\]\./", "node_modules"],
            trace: true
        },
        // {
        //     name: 'FNet IO SYSTEM',
        //     exec_mode: 'cluster',
        //     instances: 'max',
        //     interpreter: 'node',
        //     script: '.nuxt/.output/server/index.mjs',
        //     args: 'start',
        //     ignore_watch: ["[\/\\]\./", "node_modules"]
        // },
        {
            name: 'FNet PAYMENT SYSTEM',
            namespace: 'Online payments',
            cwd: resolve(__dirname, '../fNet-payment-api'),
            exec_mode: 'cluster_mode',
            instances: 1,
            interpreter: 'node',
            script: './server.js',
            args: 'start',
            env: {
                NODE_ENV: 'production'
            },
            wait_ready: true,
            restart_delay: 5000,
            ignore_watch: ["[\/\\]\./", "node_modules"],
            node_args: ['--harmony']
        }
    ]
}
