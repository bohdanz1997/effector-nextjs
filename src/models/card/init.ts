import './current/init'
import './add/init'
import './edit/init'
import { forward, sample } from 'effector'
import { boardClicked } from '../board'
import { addCard, removeCard, updateCard } from '../cards'
import {
  $currentCard,
  resetCurrentId,
  resetTitle,
  setCurrentId,
  titleChanged,
} from './current'
import { cardClicked } from './edit'

forward({
  from: cardClicked,
  to: setCurrentId,
})

forward({
  from: [addCard, updateCard, removeCard, boardClicked],
  to: resetCurrentId,
})

forward({
  from: [addCard, updateCard, removeCard, boardClicked],
  to: resetTitle,
})

sample({
  source: $currentCard,
  clock: cardClicked,
  fn: (card) => card?.title || '',
  target: titleChanged,
})
