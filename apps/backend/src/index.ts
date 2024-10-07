import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const scheduled: ExportedHandlerScheduledHandler = async (event, env, ctx) => {
  // ctx.waitUntil(doSomeTaskOnASchedule())
}

export default {
  fetch: app.fetch,
  scheduled,
}
