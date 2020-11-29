import { Method } from 'axios'

export type Request = {
  path: string
  method: Method
  data?: Record<string, unknown>
  params?: Record<string, string>
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
