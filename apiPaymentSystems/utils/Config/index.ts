import { Config } from './config-class'
import { ABilling } from './abilling-class'
import { Easypay } from '../EasyPayClass'

const config = new Config()


const aBilling = config.set<ABilling>('aBilling', new ABilling())
aBilling.addPaymentSystem<Easypay>('easypay', new Easypay())

export const easypay = aBilling.getPaymentSystem('easypay')

export { config, aBilling }
