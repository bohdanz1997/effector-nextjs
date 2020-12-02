import { combine } from 'effector'

import { app } from '../app'
import { $lists } from '../lists'
import { $cards, Card } from '../cards'

export const boardClicked = app.createEvent()
export const initializeBoard = app.createEvent()

export const $listsWithCards = combine($lists, $cards, (lists, cards) =>
  lists.map((list) => ({
    ...list,
    cards: cards.filter((card) => list.id === card.listId),
  })),
)

export const $targetCard = app.createStore<Card | null>(null)
