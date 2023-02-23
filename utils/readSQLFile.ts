import fs from 'fs'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import { parse as parseSql } from 'sql-parser'

interface SQLFile {
  statements: string[]
}

export const getAbsoluteFilePath = (src: string): string => {
  const dir = dirname(fileURLToPath(import.meta.url))
  return path.join(dir, src)
}

export const readSqlFile = async (filePath: string): Promise<SQLFile> => {
  try {
    const absolutePath = getAbsoluteFilePath(filePath)
    const fileBuffer = await fs.promises.readFile(absolutePath)
    const fileString = fileBuffer.toString()
    const statements = parseSql(fileString).map((statement) => statement.sql)
    return { statements }
  } catch (err) {
    console.error(`Error reading SQL file: ${filePath}`, err)
    throw err
  }
}


// import fs from 'fs'
// import { fileURLToPath } from 'url'
// import path, { dirname } from 'path'
// import { parse as parseSql } from 'sql-parser'

// interface SQLFile {
//   statements: string[]
// }

// export const getAbsoluteFilePath = (src: string): string => {
//   const dir = dirname(fileURLToPath(import.meta.url))
//   return path.join(dir, src)
// }

// export const readSqlFile = async (filePath: string): Promise<SQLFile> => {
//   try {
//     const absolutePath = getAbsoluteFilePath(filePath)
//     const fileBuffer = await fs.promises.readFile(absolutePath)
//     const fileString = fileBuffer.toString()
//     const statements = parseSql(fileString).map((statement) => statement.sql)
//     return { statements }
//   } catch (err) {
//     console.error(`Error reading SQL file: ${filePath}`, err)
//     throw err
//   }
// }
