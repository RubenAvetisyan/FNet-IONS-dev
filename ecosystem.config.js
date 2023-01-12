const { resolve } = require('path')
console.log('cwd: ', resolve(__dirname));

const currentDir = resolve(__dirname)
const paymentAPIDir = resolve(__dirname, '../fNet-payment-api')
console.log('currentDir: ', currentDir);

const nuxtEnv = {
    NODE_ENV: 'production',
    NITRO_PORT: 3001,
    NITRO_PRESET: 'node_cluster',
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
}

module.exports = {
    apps: [
        {
            name: 'FNet_PAYMENT_SYSTEM',
            namespace: 'Online payments',
            exec_mode: 'fork',
            instances: 1,
            // interpreter: 'node',
            script: resolve(__dirname, '../fNet-payment-api', './server.mjs'),
            wait_ready: true,
            // ignore_watch: ["[\/\\]\./", "node_modules"],
            watch: true,
            args: "limit",
            node_args: ['--harmony'],
            attach: true,
            increment_var: 'PORT',
            env: {
                NODE_ENV: 'production',
                PORT: 3000
            },
            max_memory_restart: '60M',
            // kill_timeout: 16000,
        },
        {
            name: 'FNet_PAYMENT_SYSTEM',
            namespace: 'Online payments',
            exec_mode: 'cluster',
            instances: 0,
            // interpreter: 'node',
            script: resolve(__dirname, '../fNet-payment-api', './server.mjs'),
            wait_ready: true,
            // ignore_watch: ["[\/\\]\./", "node_modules"],
            watch: true,
            args: "rotate",
            node_args: ['--harmony'],
            attach: true,
            increment_var: 'PORT',
            env: {
                NODE_ENV: 'production',
                PORT: 3000
            },
            max_memory_restart: '60M',
            // kill_timeout: 16000,
        },
        // {
        //     name: 'FNet_IO_SYSTEM',
        //     namespace: 'FNet',
        //     // exec_mode: 'fork',
        //     instances: 4,
        //     interpreter: 'node',
        //     cwd: currentDir,
        //     script: '.output/server/index.mjs',
        //     env: nuxtEnv,
        //     wait_ready: true,
        //     ignore_watch: ["[\/\\]\./", "node_modules"],
        //     trace: true
        // },
        // {
        //     name: 'FNet_IO_SYSTEM',
        //     namespace: 'FNet',
        //     exec_mode: 'cluster',
        //     instances: 3,
        //     interpreter: 'node',
        //     cwd: currentDir,
        //     script: '.output/server/index.mjs',
        //     env: nuxtEnv,
        //     ignore_watch: ["[\/\\]\./", "node_modules"],
        //     trace: true
        // },
        // {
        //     name: 'FNet_PAYMENT_SYSTEM',
        //     namespace: 'Online payments',
        //     cwd: paymentAPIDir,
        //     exec_mode: 'cluster',
        //     instances: 3,
        //     interpreter: 'node',
        //     script: './server.js',
        //     args: 'start',
        //     env: {
        //         NODE_ENV: 'production'
        //     },
        //     wait_ready: true,
        //     restart_delay: 5000,
        //     ignore_watch: ["[\/\\]\./", "node_modules"],
        //     node_args: ['--harmony']
        // }
    ]
}
