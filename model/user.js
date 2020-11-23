import { app } from './app'

const sleepFx = app.createEffect({
  async handler(time) {
    await new Promise(res => setTimeout(res, time))
  }
})

const fetchName = app.createEffect({
  async handler() {
    await sleepFx(1000)
    return 'Foo'
  }
})

export const fetchUserFx = app.createEffect(async () => {
  const name = await fetchName()
  await sleepFx(1000)
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
