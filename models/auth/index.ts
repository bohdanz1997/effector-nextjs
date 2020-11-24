import { app } from '../app'

import { User } from './types'

export const $user = app.createStore<User>({
  email: '',
})
