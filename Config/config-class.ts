export class Config {
  private _configs = new Map()
  isTest: boolean

  constructor() {
    this.isTest = false
    this._init()
  }

  private _init() {
    const { isTest, dbConfigs } = useRuntimeConfig()
    
    this.isTest = isTest === 'true'
    this.set('dbConfig', dbConfigs)
  }

  getKeys() {
    return [...this._configs.keys()]
  }

  get(key: string): MapsType<any> extends Map<any, infer I> ? I : never {
    const result = this._configs.get(key)
    if (!result)
      return {}
    return result
  }

  set<S>(key: string, value: S) {
    this._configs.set(key, value)
    return this.get(key) as S
  }
}
