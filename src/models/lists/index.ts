import { app } from '../app'
import { List } from './types'

export const setLists = app.createEvent<List[]>()
export const addList = app.createEvent<List>()
export const updateList = app.createEvent<List>()
export const removeListById = app.createEvent<number>()

export const fetchListsFx = app.createEffect<void, List[]>()

export const $lists = app.createStore<List[]>([])
