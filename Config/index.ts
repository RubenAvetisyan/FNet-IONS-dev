import { Config } from './config-class'
import { easyPay } from '~~/apiPaymentSystems/utils/paymentSystems'
import { ABilling } from '~~/apiPaymentSystems/utils/ABilling'
import type { Easypay } from '~~/apiPaymentSystems/utils/EasyPayClass'

export const config = new Config()

export const aBilling = config.set<ABilling>('aBilling', new ABilling())
aBilling.addPaymentSystem<Easypay>('easypay', easyPay)
