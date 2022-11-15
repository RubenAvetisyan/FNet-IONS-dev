type ConfigType = Map<string, any>

export class Config {
  private _configs: ConfigType
  isTest: boolean

  constructor() {
    this._configs = new Map<string, any>()
    this.isTest = false
  }

  get(key: string): ConfigType extends Map<any, infer I> ? I : never {
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
