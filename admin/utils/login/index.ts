import { H3Error } from 'h3'
import { executeQuery } from '../sync/getPaymentsFromLanBilling'
import transfrom from '../user/response-transfrom'

const setQueryString = (user: string, password: string) => {
  return `SELECT
  user.id as 'id',
    user.title as 'fullName',
    ps_title.title as 'role',
    ps_title.id as 'roleId',
    user.description as 'description',
    user.email as 'email',
    gr.group_id as 'groupId',
    gr_title.title as 'type'
  FROM erp.user as user
inner join erp.user_group as gr
on user.id = gr.user_id
inner join erp.user_group_title as gr_title
on gr.group_id = gr_title.id
inner join erp.user_group_permset as ps
on ps.group_id = gr.group_id
inner join erp.user_permset_title as ps_title
on ps_title.id = ps.permset_id
  where
    (BINARY login = "${user}" or BINARY email = "${user}")
  and BINARY password = "${password}"
  and erp.user.status = 0
  and gr.group_id <> 19
  and gr.group_id <> 25
  and ps_title.id <> 3
  and ps_title.id <> 4
  and not(
      user.title like "%#%"
    or user.title like "%test%"
    or user.title like "%Test%"
    or user.title like "%Тест%"
    or user.title like "%тест%"
    or user.description like "%уфанет%"
    or user.description like "%Уфанет%"
    or user.description like "%ufanet%"
    or user.description like "%Ufanet%"
    or user.description like "%Авантис%"
    or user.description like "%авантис%"
    )`
}

export default async function (user: string, password: string): Promise<AuthResult | H3Error> {
  const queryString = setQueryString(user, password)

  const reponse = await executeQuery<AuthResponse>(queryString, 'erp')
  if (reponse instanceof H3Error)
    return reponse

  const result = transfrom(reponse)
  return result
}
