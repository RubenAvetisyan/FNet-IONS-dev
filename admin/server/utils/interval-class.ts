import { Fn, } from "@vueuse/core"
import { Ref, ref } from "vue"
import { useSetAutoSync } from '@/admin/composables/autosync'
export class PaymentInterval {
    _response: any
    _pause: Fn
    _resume: Fn
    _isActive: Ref<boolean>

    constructor() {
        this._response = null
        this._pause = () => console.log('no _pause Method')
        this._resume = () => console.log('no _resume Method')
        this._isActive = ref(false)
        this.setInterval()
    }

    pause() {
        return this._pause()
    }
    resume() {
        return this._resume()
    }

    get response() {
        return this._response
    }

    get isActive() {
        return this._isActive
    }
    /**
     * 
     * @param interval - in milliseconds. Default is 5000 
     */
    setInterval(interval: number = 5000) {
        console.log('interval: ', interval);
        const { pause, resume, isActive } = useSetAutoSync(async () => {
            this._response = await $fetch('/api/payments')

        }, interval, { immediate: true, immediateCallback: true })

        this.pause = pause
        this.resume = resume

        console.log('isActive.value: ', isActive.value);
        this._isActive = isActive

        return { pause, resume, isActive, response: this.response }
    }
}

export const paymentInterval = new PaymentInterval()