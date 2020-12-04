import axios, { Method } from 'axios'
import { app } from '../app'
import { Request, Fail, Success } from './types'

const API_URL = process.env.NEXT_PUBLIC_API_URL

type Options = {
  data?: Record<string, unknown>
  params?: Record<string, string>
  headers?: Record<string, string>
  cookies?: string
}

export const request = async <T>(
  path: string,
  method: Method,
  { params, data, headers, cookies }: Options = {},
): Promise<T> => {
  const response = await axios({
    url: `${API_URL}${path}`,
    method,
    params,
    data,
    headers,
  })

  return response.data
}

export const requestInternal = async <T>({
  path,
  method,
  params,
  data,
  headers,
  cookies,
}: Request): Promise<T> => {
  const response = await axios({
    url: `${API_URL}${path}`,
    method,
    params,
    data,
    headers,
  })

  return response.data
}

export const requestFx = app.createEffect<Request, unknown, Fail>()

export type { Request, Success, Fail }
