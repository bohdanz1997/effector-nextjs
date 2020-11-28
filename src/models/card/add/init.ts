import { combine, guard, sample } from 'effector'
import { uuid } from 'lib/uuid'
import { boardClicked } from 'models/board'
import { app } from 'models/app'
import * as listModel from 'models/list'
import { addCard } from 'models/cards'
import { $title, enterPressed } from 'models/card/current'

import { $isAdding, addButtonClicked } from './index'

$isAdding.on(addButtonClicked, () => true).reset(boardClicked, addCard)

const addNewCard = app.createEvent<{
  id: number
  title: string
  listId: number | null
}>()

const $createCardData = combine(
  $title,
  listModel.$currentId,
  (title, listId) => ({
    id: uuid(),
    title,
    listId,
  }),
)

sample({
  source: $createCardData,
  clock: guard({
    source: enterPressed,
    filter: $isAdding.map(Boolean),
  }),
  target: addNewCard,
})

guard({
  source: addNewCard,
  filter: listModel.$currentId.map(Boolean),
  target: addCard,
})
