import './current/init'
import './add/init'
import './edit/init'
import { forward, sample } from 'effector'
import { boardClicked } from '../board'
import { addCard, removeCardById, updateCard } from '../cards'
import { $currentCard, resetCurrentId, setCurrentId } from './current'
import { cardClicked } from './edit'
import {
  $hoveredId,
  $title,
  cardHovered,
  cardLeaved,
  titleChanged,
} from './index'

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
