import { IncomingMessage, ServerResponse } from 'http'
import { createDomain } from 'effector'
// TODO: createGate is not exported from effector-react/ssr
// import { createGate } from 'effector-react'

export const app = createDomain()

// export const AppGate = createGate({
//   domain: app,
// })

export const serverStarted = app.createEvent<{
  req: IncomingMessage
  res: ServerResponse
}>()

export const requestHandled = serverStarted.map(({ req }) => req)
export const cookiesReceived = requestHandled.filterMap(
  (req) => req.headers.cookie,
)
