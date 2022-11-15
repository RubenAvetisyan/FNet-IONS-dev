import fs from 'node:fs'
import { resolve } from 'path'

const FILE_PATH = resolve('example.log')
const counter = 0
let str: string | boolean = fs.readFileSync(FILE_PATH, 'utf-8')
export default defineEventHandler(async (event) => {
  const body: string = await useBody(event)
  let prefix = ''
  if (!str) {
    prefix = ';'
    str = true
  }

  fs.appendFileSync(FILE_PATH, `${prefix}${body}`, 'utf-8')
  //   console.log('FETCHING log/#....')
  await $fetch(`/log/${encodeURIComponent(counter)}`)
  return `LOGGED: ${new Date(Date.now()).toTimeString()}`
})
