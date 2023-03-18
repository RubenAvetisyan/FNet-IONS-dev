import db from '~/admin/assets/SQL/ABilling/db.json'

export default defineEventHandler(async () => {
    return db
})