import { it } from "node:test"

export default defineEventHandler(async (event) => {
  if (!event.node.req.url?.includes('/api/auth'))
    console.log(`New request: ${event.node.req.url}`)
})
