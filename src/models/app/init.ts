import { app } from './index'

app.onCreateEffect((fx) => {
  fx.failData.watch((error) => {
    console.error(`Error in ${fx.shortName}`)
    console.error(error)
  })
})
