import { app } from '../app'
import { List, ListCreateParams, ListUpdateParams } from './types'

export const setLists = app.createEvent<List[]>()
export const addList = app.createEvent<List>()
export const updateList = app.createEvent<List>()
export const removeList = app.createEvent<number>()

export const fetchListsFx = app.createEffect<void, List[]>()
export const createListFx = app.createEffect<ListCreateParams, List>()
export const updateListFx = app.createEffect<ListUpdateParams, List>()
export const removeListFx = app.createEffect<number, number>()

export const $lists = app.createStore<List[]>([])

export type { List }
