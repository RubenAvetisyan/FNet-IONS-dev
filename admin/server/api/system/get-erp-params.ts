import { executeQuery } from '~~/admin/utils/sync/getPaymentsFromLanBilling'

const rowQuery = `SELECT * FROM param_pref
left join n_param_list_value
	on param_pref.id = n_param_list_value.param_id
`

export default defineEventHandler(async (event) => {
  const param_list_value = executeQuery('SELECT * FROM n_param_list_value', 'erp')
  const param_pref = executeQuery('SELECT * FROM param_pref', 'erp').then((res) => {

  })

  const params = {
    list: [],
  }

  params.list = executeQuery(rowQuery, 'erp') as any
  return params.list
})
