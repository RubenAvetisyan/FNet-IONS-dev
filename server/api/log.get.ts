import fs from 'node:fs'
import { resolve } from 'path'

const FILE_PATH = resolve('example.log')

export default defineEventHandler(async () => {
  const log = fs.readFileSync(FILE_PATH, { encoding: 'utf-8' })
  return log.trim() // sendStream(event, stream)
})
