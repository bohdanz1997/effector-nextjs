import { Card } from './types'
import { app } from '../app'

export const $cards = app.createStore<Card[]>([])

export const setCards = app.createEvent<Card[]>()
export const addCard = app.createEvent<Card>()
