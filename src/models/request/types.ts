import { Method } from 'axios'

export type Request = {
  path: string
  method: Method
  body?: Record<string, unknown>
  query?: Record<string, string>
  headers?: Record<string, string>
  cookies?: string
}

export type Success<T> = {
  data: T
  status: number
}

export type Fail<T = unknown> = {
  error: T
}
