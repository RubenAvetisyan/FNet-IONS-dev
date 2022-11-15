import type { Ref } from 'vue'

export interface UseAutoSyncType {
  pause: () => void
  resume: () => void
  isActive: Ref<boolean>
}

export const useSetAutoSync = (cb: (option?: any) => void | Promise<any>, ms: number, option?: any) => {
  const { pause, resume, isActive } = useIntervalFn(cb, ms, option)

  return { pause, resume, isActive }
}

export const useSetSyncStatusMessage = (isActive: boolean) =>
  unref(isActive) ? 'Autosyncronization is runing' : 'Autosyncronization stopped'
