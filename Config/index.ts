import { Config } from './config-class'
import type { Easypay } from '~~/apiPaymentSystems/utils/paymentSystems'
import { easyPay } from '~~/apiPaymentSystems/utils/paymentSystems'
import { ABilling } from '~~/apiPaymentSystems/utils/ABilling'

export const config = new Config()

const { syncConfig } = useRuntimeConfig()
config.set('dbConfig', { ...syncConfig, port: +syncConfig.port || 3306 })

export const aBilling = config.set<ABilling>('aBilling', new ABilling())
aBilling.addPaymentSystem<Easypay>('easypay', easyPay)
