import { Config } from './config-class'
import { easyPay } from '~~/apiPaymentSystems/utils/paymentSystems'
import { ABilling } from '~~/apiPaymentSystems/utils/ABilling'
import type { Easypay } from '~~/apiPaymentSystems/utils/EasyPayClass'

const runTimeConfig = useRuntimeConfig()

export const config = new Config()
config.isTest = runTimeConfig.isTest === 'true'
const { lanbilling, abilling, erp } = useRuntimeConfig()
config.set('dbConfig', {
  lanbilling: { ...lanbilling, port: +lanbilling.port || 3306, insecureAuth: true },
  abilling: { ...abilling, port: +abilling.port || 3306, insecureAuth: true },
  erp: { ...erp, port: +erp.port || 3306, insecureAuth: true },
})

export const aBilling = config.set<ABilling>('aBilling', new ABilling())
aBilling.addPaymentSystem<Easypay>('easypay', easyPay)
