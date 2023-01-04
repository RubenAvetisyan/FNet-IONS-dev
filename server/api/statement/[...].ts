import { readBody, H3Error, defineEventHandler } from 'h3';
import path, { dirname } from 'node:path'
import { getQuery } from '../../../admin/utils/LanBilling/query'
import { lanbillingConnection, abillingConnection } from '../../../admin/utils/LanBilling/bdConnect'
import { fileURLToPath } from 'node:url';
import { readSql } from '../../../utils/readSQLFile'

const dir = import.meta.url

type ReplaceParams = {
    from: string,
    to: string
}

type Options = {
    replace: ReplaceParams[]
}

type StatementBody = {
    statementFileName: string,
    options: Options | undefined
}

export default defineEventHandler(async (event) => {
    const { statementFileName, options = undefined }: StatementBody = await readBody(event)

    const filePath = path.resolve(dirname(fileURLToPath(dir)), '../../admin/assets/SQL/', statementFileName)
    let query = readSql(filePath + '.sql')

    if (!!options) {
        options.replace.forEach(item => {
            query = query.replace(item.from, item.to)
        })
    }

    const billing = await lanbillingConnection

    if (billing instanceof H3Error) return billing

    const statement = await getQuery(query, billing)

    return statement
})