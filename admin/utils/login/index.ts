import { H3Error } from 'h3'
import { erpConnection } from '../LanBilling/bdConnect'
import { getQuery } from '../LanBilling/query'
import { config } from '@/Config'

const { erp } = useRuntimeConfig()

const dbName = config.isTest ? 'sql7579349' : erp.database

const setQueryString = (user: string, password: string) => {
  return `
  SELECT 
    user.id as id,
    user.title as fullName,
    user.description as description,
    user.email as email,
    gr.group_id as groupId,
    gr_title.title as type
  FROM ${dbName}.user as user
inner join ${dbName}.user_group as gr
on user.id = gr.user_id
inner join ${dbName}.user_group_title as gr_title
on gr.group_id = gr_title.id
where
  (BINARY login = "${user}" or BINARY email = "user")
  and BINARY password = "${password}"
  and user.status = 0;`
}

export default async function (user: string, password: string) {
  const queryString = setQueryString(user, password)
  const erp = await erpConnection

  if (erp instanceof H3Error)
    return erp

  const reponse = await getQuery(queryString, erp) as AuthResponse[]
  const result: AuthResult = {
    id: 0,
    fullName: '',
    email: '',
    type: '',
    description: '',
    groupId: [],
  }

  reponse.forEach(({ description, email, fullName, groupId, id, type }) => {
    result.id = id
    result.fullName = fullName
    result.email = email
    result.type = type
    result.description = description
    result.groupId.push(groupId as number)
  })

  return result
}
