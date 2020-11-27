import { combine, guard, sample } from 'effector'
import { uuid } from 'lib/uuid'

import { addCard } from '../../cards'
import {
  $isEditing,
  $activeListId,
  $title,
  enterPressed,
  startAddingCard,
  titleChanged,
} from './index'

$isEditing.on(startAddingCard, () => true).on(enterPressed, () => false)

$title.on(titleChanged, (_, title) => title).reset(addCard)

guard({
  source: startAddingCard.map(({ listId }) => listId),
  filter: Boolean,
  target: $activeListId,
})

const $addingCard = combine(
  {
    title: $title,
    listId: $activeListId,
  },
  ({ title, listId }) => ({
    id: uuid(),
    title,
    listId,
  }),
)

sample({
  source: $addingCard,
  clock: enterPressed,
  target: addCard,
})
