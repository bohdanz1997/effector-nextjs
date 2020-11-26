import { app } from 'models/app'
import { Card } from 'models/board/types'

export const $cards = app.createStore<Card[]>([])

export const setCards = app.createEvent<Card[]>()
export const addCard = app.createEvent<Card>()
