export default defineEventHandler(async (event) => {
  const { type } = getQuery(event)

  const name = type as string
  return deleteCookie(event, name)
})
