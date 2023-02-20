export default defineEventHandler(async (event) => {
  console.log(`New request: ${event.node.req.url}`)
})
