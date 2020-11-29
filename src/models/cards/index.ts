import { app } from '../app'
import { Card, CardCreateParams, CardUpdateParams } from './types'

export const setCards = app.createEvent<Card[]>()
export const addCard = app.createEvent<Card>()
export const updateCard = app.createEvent<Card>()
export const removeCard = app.createEvent<number>()

export const fetchCardsFx = app.createEffect<void, Card[]>()
export const createCardFx = app.createEffect<CardCreateParams, Card>()
export const updateCardFx = app.createEffect<CardUpdateParams, Card>()
export const removeCardFx = app.createEffect<number, number>()

export const $cards = app.createStore<Card[]>([])

export type { Card }
