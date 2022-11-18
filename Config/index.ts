import { Config } from './config-class'
import { easyPay } from '~~/apiPaymentSystems/utils/paymentSystems'
import { ABilling } from '~~/apiPaymentSystems/utils/ABilling'
import type { Easypay } from '~~/apiPaymentSystems/utils/EasyPayClass'

export const config = new Config()

const { lanbilling, abilling, erp } = useRuntimeConfig()
config.set('dbConfig', {
    lanbilling: { ...lanbilling, port: +lanbilling.port || 3306 },
    abilling: { ...abilling, port: +abilling.port || 3306 },
    erp: { ...erp, port: +erp.port || 3306 }
})

export const aBilling = config.set<ABilling>('aBilling', new ABilling())
aBilling.addPaymentSystem<Easypay>('easypay', easyPay)
