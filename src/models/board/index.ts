import { app } from '../app'
import { Card } from './types'

export const $cards = app.createStore<Card[]>([])

export const setCards = app.createEvent<Card[]>()
export const addCard = app.createEvent<Card>()
