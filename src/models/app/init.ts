import { forward } from 'effector'
import { getSessionFx } from '../auth'
import { app, serverStarted } from './index'

app.onCreateEffect((fx) => {
  fx.failData.watch((error) => {
    console.error(`Error in ${fx.shortName}`)
    console.error(error)
  })
})

forward({
  from: serverStarted,
  to: getSessionFx,
})
