import crypto from 'node:crypto'

const algorithm = 'aes-256-cbc'
const key = 'hwoAmIForYou_maybeTrue'

let iv: any

let base64Data: any

(async function () {
    const {
        randomBytes
    } = await import('crypto')
    iv = randomBytes(16)
    base64Data = Buffer.from(iv, 'binary').toString('base64')
    console.log('iv: ', iv);
})()


export const encrypt = (msg: string) => {
    try {
        const chipher = crypto.createCipheriv(algorithm, key, iv)
        let encryptData = chipher.update(msg, 'utf-8', 'hex')
        encryptData += chipher.final('hex')
        return encryptData
    } catch (error) {
        console.log('error: ', error);

    }
}

export const dencrypt = (encryptedData: string) => {
    const originalData = Buffer.from(base64Data, 'base64')
    const dechipher = crypto.createDecipheriv(algorithm, key, originalData)
    let dencryptData = dechipher.update(encryptedData, 'hex', 'utf-8')

    return dencryptData
}