export const useSetAutoSync = (cb: () => void | Promise<any>, ms: number) => {
    const { pause, resume, isActive } = useIntervalFn(cb, ms)

    return { pause, resume, isActive }
}

export const useSetSyncStatusMessage = (isActive: boolean) => unref(isActive) ? 'Autosyncronization stopped' : 'Autosyncronization is runing'