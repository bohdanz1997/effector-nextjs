import { forward } from 'effector'

import { app, AppGate } from 'models/app/index'

forward({
  from: AppGate.open,
  to: [],
})

app.onCreateEffect((fx) => {
  fx.failData.watch((error) => {
    console.error(`Error in ${fx.shortName}`)
    console.error(error)
  })
})
