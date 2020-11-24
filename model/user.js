import { app } from './app'

const fetchName = app.createEffect({
  async handler() {
    return 'Foo'
  }
})

export const fetchUserFx = app.createEffect(async () => {
  const name = await fetchName()
  return {
    name,
    email: 'foo@mail.com',
  }
})

export const $user = app.createStore({})
  .on(fetchUserFx.doneData, (_, user) => user)

export const inc = app.createEvent()
export const dec = app.createEvent()
export const resetCounter = app.createEvent()

export const $counter = app.createStore(0)
  .on(inc, (counter) => counter + 1)
  .on(dec, (counter) => counter - 1)
  .reset(resetCounter)
