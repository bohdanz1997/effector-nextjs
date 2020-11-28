import { app } from 'models/app'
import { Card } from 'models/cards'

export const cardHovered = app.createEvent<number>()
export const cardLeaved = app.createEvent<number>()
export const titleChanged = app.createEvent<string>()
export const keyPressed = app.createEvent<string>()
export const enterPressed = keyPressed.filter({
  fn: (key) => key === 'Enter',
})

export const setCurrentId = app.createEvent<number>()
export const resetCurrentId = app.createEvent<void>()
export const resetTitle = app.createEvent<void>()

export const $currentId = app.createStore<number>(0)
export const $hoveredId = app.createStore<number | null>(null)
export const $currentCard = app.createStore<Card | null>(null)
export const $title = app.createStore<string>('')
