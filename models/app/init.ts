import { forward } from 'effector'

import {
  app, AppGate
} from './'

forward({
  from: AppGate.open,
  to: []
})

app.onCreateEffect(fx => {
  fx.failData.watch(err => {
    console.error(`Error in ${fx.shortName}`)
    console.error(err)
  })
})
