import { guard } from 'effector'
import { request } from '../request'
import {
  $cookiesFromResponse,
  $session,
  createSessionFx,
  getSessionFx,
  setCookiesFromResponse,
} from './index'

createSessionFx.use(({ email, password }) =>
  request('/auth/login', 'POST', {
    data: { email, password },
  }),
)

$cookiesFromResponse.on(setCookiesFromResponse, (_, cookies) => cookies)

getSessionFx.use(() => request('/auth/profile', 'GET'))

createSessionFx.doneData.watch((session) => console.log('session', session))

$session.on(getSessionFx.doneData, (_, { data }) => data)

// const setCookieHeader = createSessionFx.doneData.map(
//   ({ headers }) => headers['set-cookie'] ?? '',
// )
// setCookieHeader.watch((value) => console.log('setCookieHeader', value))
//
// guard({
//   source: setCookieHeader,
//   filter: (setCookie) => setCookie !== '',
//   target: setCookiesFromResponse,
// })
