import { combine, forward } from 'effector'
import { uuid } from 'lib/uuid'

import { app } from '../app'
import { $lists, setLists } from '../lists'
import { $cards, setCards } from '../cards'
import * as cardModel from '../card'
import * as listModel from '../list'

export const boardClicked = app.createEvent()

export const $listsWithCards = combine($lists, $cards, (lists, cards) =>
  lists.map((list) => ({
    ...list,
    cards: cards.filter((card) => list.id === card.listId),
  })),
)

forward({
  from: cardModel.addButtonClicked,
  to: listModel.setCurrentId,
})

// initialize
const one = uuid()
const two = uuid()

setLists([
  { id: one, title: 'TODO' },
  { id: two, title: 'In progress' },
])

setCards([
  { id: uuid(), title: 'First', listId: one },
  { id: uuid(), title: 'Second', listId: two },
])

$cards.watch((v) => console.log('cards', v))
