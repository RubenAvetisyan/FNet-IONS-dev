import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { H3Error, defineEventHandler, readBody } from 'h3'
import { readSqlFile } from '../../../utils/readSQLFile'
import { executeQuery } from '~~/admin/utils/sync/getPaymentsFromLanBilling'

const dir = import.meta.url

interface ReplaceParams {
  from: string
  to: string
}

interface Options {
  replace: ReplaceParams[]
}

interface StatementBody {
  statementFileName: string
  options: Options | undefined
}

export default defineEventHandler(async (event) => {
  const { statementFileName, options = undefined }: StatementBody = await readBody(event)

  const filePath = path.resolve(dirname(fileURLToPath(dir)), '../../admin/assets/SQL/', statementFileName)
  let query = readSqlFile(`${filePath}.sql`)

  if (options) {
    options.replace.forEach((item) => {
      query = query.replace(item.from, item.to)
    })
  }

  const statement = await executeQuery(query, 'lanbilling')

  return statement
})
