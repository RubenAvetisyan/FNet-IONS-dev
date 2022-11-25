import crypto from 'node:crypto'

const algorithm = 'aes-256-cbc'
const key = 'FNet-TELECOM-REST-API-SECRET-KEY'
export const encrypt = (msg: string) => {
  try {
    const iv = crypto.randomBytes(16)
    const base64Data = Buffer.from(iv, 'binary').toString('base64')
    const chipher = crypto.createCipheriv(algorithm, key, iv)
    let encryptData = chipher.update(msg, 'utf-8', 'hex')
    encryptData += chipher.final('hex')
    return { token: encryptData, base64Data }
  }
  catch (error) {
    console.log('error: ', error)
  }
}

export const decrypt = (encryptedData: {
  token: string,
  base64Data: string
}) => {
  const originalData = Buffer.from(encryptedData.base64Data, 'base64')
  const dechipher = crypto.createDecipheriv(algorithm, key, originalData)
  let dencryptData = dechipher.update(encryptedData.token, 'hex', 'utf-8')
  dencryptData += dechipher.final()

  return dencryptData
}
