import { combine, guard, sample } from 'effector'
import { uuid } from 'lib/uuid'

import { addCard } from '../../cards'
import {
  $isEditing,
  $activeListId,
  $title,
  enterPressed,
  setActiveListId,
  titleChanged,
} from './index'

$isEditing.on(setActiveListId, () => true).on(enterPressed, () => false)

$title.on(titleChanged, (_, title) => title).reset(addCard)

$activeListId.on(setActiveListId, (_, listId) => listId)

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
