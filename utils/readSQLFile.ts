import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import path, { dirname } from 'node:path'
export const getAbsoluteFilePath = (src: string): string => {
  const dir = dirname(fileURLToPath(import.meta.url))
  return path.join(dir, src)
}

export const readSqlFile = async (filePath: string): Promise<string> => {
  try {
    const absolutePath = getAbsoluteFilePath(filePath)
    const fileBuffer = await fs.promises.readFile(absolutePath)
    const fileString = fileBuffer.toString()
    const statements = fileString
      .replace(/[\r\n]/g, ' ')
      .replace(/\s+/g, ' ')
      .split(';')
      .map(Function.prototype.call, String.prototype.trim)
      .filter((el: string) => el.length !== 0)
      .join('; ')

    return statements
  } catch (error) {
    console.error(`Error reading SQL file: ${filePath}`, error)
    throw error
  }
}