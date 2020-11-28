import { combine, guard, sample } from 'effector'
import { boardClicked } from 'models/board'
import { updateCard } from 'models/cards'

import { $currentCard } from '../current'
import { $title, enterPressed } from '../index'
import { $isEditing, cardClicked } from './index'

$isEditing.on(cardClicked, () => true).reset(boardClicked, updateCard)

const $updateData = combine($currentCard, $title, (card, title) => ({
  ...card,
  title,
}))

sample({
  source: $updateData,
  clock: guard({
    source: enterPressed,
    filter: $isEditing.map(Boolean),
  }),
  target: updateCard,
})
