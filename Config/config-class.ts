import { RuntimeConfig } from "@nuxt/schema"

interface ConfigMap {
  [key: string]: any
}

export class Config {
  private _configs = new Map<keyof ConfigMap, any>()
  isTest: boolean

  constructor() {
    this.isTest = false
    this._init()
  }

  private _init() {
    const { isTest, dbConfigs } = useRuntimeConfig()

    this.isTest = isTest === 'true'
    this.set<RuntimeConfig['dbConfig']>('dbConfig', dbConfigs)
  }

  getKeys() {
    return [...this._configs.keys()]
  }

  get<S>(key: string): S {
    const result = this._configs.get(key)
    if (!result)
      return {} as S;
    return result as S;
  }

  set<S>(key: string, value: S) {
    this._configs.set(key, value)
    return this.get(key) as S
  }
}
