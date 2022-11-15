type MapType = Map<string, any>

class Settings {
    private options: MapType
    constructor(public name: string, option?: MapType) {
        this.name = name
        this.options = new Map()
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
}

export class PaymentSystem extends Settings {
    [x: string]: any

    constructor(public name: string, options?: MapType) {
        super(name, options)
    }
}