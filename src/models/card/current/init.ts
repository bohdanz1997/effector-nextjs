import { sample } from 'effector'
import { $cards } from 'models/cards'
import {
  $currentCard,
  $currentId,
  $hoveredId,
  cardHovered,
  cardLeaved,
  resetCurrentId,
  setCurrentId,
  $title,
  titleChanged,
  resetTitle,
} from './index'

$currentId.on(setCurrentId, (_, id) => id).reset(resetCurrentId)
$hoveredId.on(cardHovered, (_, id) => id).reset(cardLeaved)
$title.on(titleChanged, (_, title) => title).reset(resetTitle)

sample({
  source: $cards,
  clock: $currentId,
  fn: (cards, id) => cards.find((card) => card.id === id) || null,
  target: $currentCard,
})
