import axios from 'axios'
import { app } from '../app'
import { Request, Fail, Success } from './types'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const request = async <T>({
  path,
  method,
  query,
  body,
  headers,
  cookies,
}: Request): Promise<T> => {
  const response = await axios({
    url: `${API_URL}${path}`,
    method,
    params: query,
    data: body,
    headers,
  })

  return response.data
}

export const requestFx = app.createEffect<Request, unknown, Fail>()

export type { Request, Success, Fail }
