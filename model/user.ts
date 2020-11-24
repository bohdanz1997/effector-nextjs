import { app } from './app'
import { User } from './types'

const fetchName = app.createEffect(() => 'Foo')

export const fetchUserFx = app.createEffect(async () => {
  const name = await fetchName()
  return {
    name,
    email: 'foo@mail.com',
  }
})

export const $user = app.createStore<User>({
  email: '',
  name: '',
})
  .on(fetchUserFx.doneData, (_, user) => user)

export const inc = app.createEvent()
export const dec = app.createEvent()
export const resetCounter = app.createEvent()

export const $counter = app.createStore<number>(0)
  .on(inc, (counter) => counter + 1)
  .on(dec, (counter) => counter - 1)
  .reset(resetCounter)
