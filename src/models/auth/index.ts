import { app } from 'models/app'

import { User } from 'models/auth/types'

export const $user = app.createStore<User>({
  email: '',
})
