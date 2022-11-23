import { H3Error } from 'h3'
import { erpConnection } from '../LanBilling/bdConnect'
import { getQuery } from '../LanBilling/query'
import { config } from '@/Config'

const tableName = config.isTest ? 'erp' : 'erp.user'

const setQueryString = (user: string, password: string) => {
  return `
  SELECT 
    user.id as id,
    user.title as fullName,
    user.description as description,
    user.email as email,
    gr.group_id as groupId,
    gr_title.title as type
  FROM erp.user as user
inner join erp.user_group as gr
on user.id = gr.user_id
inner join erp.user_group_title as gr_title
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
  const result = {
    id: 0,
    fullName: '',
    email: '',
    type: '',
    description: '',
    groupId: [],
  } as {
    id: number;
    fullName: string;
    email: string;
    type: string;
    description: string;
    groupId: number[];
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
