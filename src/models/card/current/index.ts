import { app } from 'models/app'
import { Card } from 'models/cards'

export const setCurrentId = app.createEvent<number>()
export const resetCurrentId = app.createEvent<void>()

export const $currentId = app.createStore<number>(0)
export const $currentCard = app.createStore<Card | null>(null)
$currentId.watch((v) => console.log('card currentID', v))
