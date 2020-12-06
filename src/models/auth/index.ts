import { app } from '../app'
import { ApiError, ApiResponse } from '../request'
import { Session, User } from './types'

export const createSessionFx = app.createEffect<
  Session,
  ApiResponse<User>,
  ApiError
>()
export const getSessionFx = app.createEffect<void, ApiResponse<Session>>()

export const setCookiesFromResponse = app.createEvent<string>()

export const $cookiesFromResponse = app.createStore<string>('')

export const $session = app.createStore<Session | null>(null)
