import type { Fn } from '@vueuse/core'
import type { Ref } from 'vue'
import { ref } from 'vue'
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
  setInterval(interval = 5000) {
    console.log('interval: ', interval)
    const { pause, resume, isActive } = useSetAutoSync(async () => {
      this._response = await $fetch('/api/payments')
    }, interval, { immediate: true, immediateCallback: true })

    this.pause = pause
    this.resume = resume

    console.log('isActive.value: ', isActive.value)
    this._isActive = isActive

    return { pause, resume, isActive, response: this.response }
  }
}

class Interval {
  private map: Map<string, any>
  constructor() {
    this.map = new Map()
  }

  set(key: string, value: any) {
    this.map.set(key, value)
    return this.map.get(key)
  }

  get(key: string) {
    return this.map.get(key)
  }
}

export const intervals = new Interval()

export const paymentInterval = intervals.set('paymentInterval', new PaymentInterval())
