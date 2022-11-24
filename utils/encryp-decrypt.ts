import crypto from 'node:crypto'

const algorithm = 'aes-256-cbc'
const key = 'FNet-TELECOM-REST-API-SECRET-KEY'

let iv: any

let base64Data: any

(async function () {
  if (process.client)
    return
  const {
    randomBytes,
  } = await import('crypto')
  iv = randomBytes(16)
  base64Data = Buffer.from(iv, 'binary').toString('base64')
  console.log('iv: ', iv)
})()

export const encrypt = (msg: string) => {
  try {
    const chipher = crypto.createCipheriv(algorithm, key, iv)
    let encryptData = chipher.update(msg, 'utf-8', 'hex')
    encryptData += chipher.final('hex')
    return encryptData
  }
  catch (error) {
    console.log('error: ', error)
  }
}

export const decrypt = (encryptedData: string) => {
  const originalData = Buffer.from(base64Data, 'base64')
  const dechipher = crypto.createDecipheriv(algorithm, key, originalData)
  let dencryptData = dechipher.update(encryptedData, 'hex', 'utf-8')
  dencryptData += dechipher.final()

  return dencryptData
}
