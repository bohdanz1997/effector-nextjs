import { sample } from 'effector'
import { $cards } from 'models/cards'
import {
  $currentCard,
  $currentId,
  $hoveredId,
  cardHovered,
  cardLeft,
  resetCurrentId,
  setCurrentId,
  $title,
  titleChanged,
  resetTitle,
  defaultCard,
} from './index'

$currentId.on(setCurrentId, (_, id) => id).reset(resetCurrentId)
$hoveredId.on(cardHovered, (_, id) => id).reset(cardLeft)
$title.on(titleChanged, (_, title) => title).reset(resetTitle)

sample({
  source: $cards,
  clock: $currentId,
  fn: (cards, id) => cards.find((card) => card.id === id) || defaultCard,
  target: $currentCard,
})
