export const useGenerateUniqueId = (id: string): string => {
  return id + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}
