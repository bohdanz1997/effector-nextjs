import { app } from '../app'
import { Card } from './types'

export const setCards = app.createEvent<Card[]>()
export const addCard = app.createEvent<Card>()
export const updateCard = app.createEvent<Card>()
export const removeCardById = app.createEvent<number>()

export const $cards = app.createStore<Card[]>([])

export type { Card }
