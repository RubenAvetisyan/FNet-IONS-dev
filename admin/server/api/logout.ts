export default defineEventHandler(async (event) => {
  const { type } = getQuery(event)

  const name = type as string
  console.log('name: ', name);
  return deleteCookie(event, name)
})
