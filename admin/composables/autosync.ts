import { Fn, useIntervalFn, UseIntervalFnOptions } from '@vueuse/core'

export const useSetAutoSync = (cb: Fn, ms: number, option?: UseIntervalFnOptions) => {
  return option ? useIntervalFn(cb, ms, option) : useIntervalFn(cb, ms)
}

export const useSetSyncStatusMessage = (isActive: boolean) =>
  unref(isActive) ? 'Autosyncronization is runing' : 'Autosyncronization stopped'
