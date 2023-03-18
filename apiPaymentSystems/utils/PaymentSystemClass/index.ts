class Settings {
  private options = new Map()
  constructor(public name: string, option?: MapsType<any>) {
    this.name = name
    this.options = option || new Map()
  }

  addOption(key: string, option: any) {
    this.options.set(key, option)
  }

  getOptions() {
    const result: any = {}
    const entries = [...this.options.entries()]
    entries.forEach(([key, value]) => {
      result[key] = value
    })

    return result
  }

  getOption(key: string) {
    return this.options.get(key)
  }
}

export class PaymentSystem extends Settings {
  [x: string]: any

  constructor(public name: string, options?: MapsType<any>) {
    super(name, options)
  }
}
