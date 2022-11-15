import { acceptHMRUpdate, defineStore } from 'pinia'

export const useLogStore = defineStore('log', () => {
  const savedLog = ref('')
  const previousNames = ref(new Set<string>())

  const usedLogs = computed(() => Array.from(previousNames.value))
  const otherLogs = computed(() => usedLogs.value.filter(log => log !== unref(savedLog)))

  function setNewLog(log: string) {
    if (savedLog.value)
      previousNames.value.add(savedLog.value)

    savedLog.value = log
  }

  return {
    setNewLog,
    otherLogs,
    savedLog,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLogStore, import.meta.hot))
