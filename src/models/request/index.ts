import Cookie from 'browser-cookies'
import axios, { Method } from 'axios'
import { app } from '../app'
import { isBrowser, isServer } from '../../lib/ssr'
import { Request, Fail, Success } from './types'

const API_URL = process.env.NEXT_PUBLIC_API_URL

type Options = {
  data?: Record<string, unknown>
  params?: Record<string, string>
  headers?: Record<string, string>
  cookies?: string
}

export type ApiResponse<T> = {
  data: T
  headers: Record<string, string>
}

export type ApiErrorData = {
  statusCode: number
  message: string
}

export class ApiError {
  public statusCode: number
  public message: string

  constructor(params: ApiErrorData) {
    this.statusCode = params.statusCode
    this.message = params.message
  }
}

export const request = async <T>(
  path: string,
  method: Method,
  { params, data, headers, cookies }: Options = {},
): Promise<ApiResponse<T>> => {
  if (isServer()) {
    headers = {}
    headers.Cookie =
      'trellio=s%3AMJSLX6rMp131y-4661aE31De9XFbHtAn.n3Ufx%2BN82oBxaoV%2FJbJEt5EJpyBqhFlxARTUnX%2BDEJk'
  }

  try {
    const response = await axios({
      url: `${API_URL}${path}`,
      method,
      params,
      data,
      headers,
      withCredentials: true,
    })

    return {
      data: response.data,
      headers: response.headers,
    }
  } catch (error) {
    const defaultError = {
      statusCode: 500,
      message: error.message,
    }
    throw new ApiError(error?.response?.data || defaultError)
  }
}

export const requestFx = app.createEffect<Request, ApiResponse<unknown>, Fail>()

export type { Request, Success, Fail }
