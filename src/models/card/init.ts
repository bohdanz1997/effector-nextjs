import './current/init'
import './add/init'
import { combine, forward, guard, sample } from 'effector'
import { boardClicked } from '../board'
import { addCard, removeCardById, updateCard } from '../cards'
import { $currentCard, resetCurrentId, setCurrentId } from './current'
import {
  $hoveredId,
  $isEditing,
  $title,
  cardClicked,
  cardHovered,
  cardLeaved,
  enterPressed,
  titleChanged,
} from './index'

$isEditing.on(cardClicked, () => true).reset(boardClicked, updateCard)

forward({
  from: cardClicked,
  to: setCurrentId,
})

forward({
  from: [addCard, updateCard, removeCardById, boardClicked],
  to: resetCurrentId,
})

$title
  .on(titleChanged, (_, title) => title)
  .reset(addCard, updateCard, removeCardById, boardClicked)

$hoveredId.on(cardHovered, (_, id) => id).reset(cardLeaved)

sample({
  source: $currentCard,
  clock: cardClicked,
  fn: (card) => card?.title || '',
  target: $title,
})

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

// $isAdding.watch((v) => console.log('card adding', v))
// $isEditing.watch((v) => console.log('card editing', v))
