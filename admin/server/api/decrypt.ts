import { decrypt } from '@/utils/encryp-decrypt'

export default defineEventHandler(async (event) => {
  const { encrypted } = getQuery(event)

  if (!encrypted)
    return

  const text = encrypted as string

  const decrypted = decrypt(text)
  console.log('decrypted: ', decrypted)

  return { decrypted }
})
