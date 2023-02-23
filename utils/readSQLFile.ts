import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import path, { dirname } from 'node:path'

const dir = import.meta.url

export const getFilePath = (src: string): string => path.join(dirname(fileURLToPath(dir)), src)

export const readSqlFile = (filePath: string): string => {
  const path = getFilePath(filePath)
  const fileBuffer = fs.readFileSync(path).toString()
  const fileString = fileBuffer
    .replace(/[\r\n]/g, ' ')
    .replace(/\s+/g, ' ')
    .split(';')
    .map(Function.prototype.call, String.prototype.trim)
    .filter((el: string) => el.length !== 0)
    .join('; ')

  return fileString
}