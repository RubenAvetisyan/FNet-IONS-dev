import { Config } from './config-class'
import { ABilling } from './aBilling-class'

const config = new Config()

const aBilling = config.set<ABilling>('aBilling', new ABilling())
config.get()
export default config