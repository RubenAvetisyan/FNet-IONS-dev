import { connection } from '@/admin/utils/ABilling/abilling-connection'
export default defineEventHandler(async (event) => {
  connection.close()
  return 'to be done'
})
