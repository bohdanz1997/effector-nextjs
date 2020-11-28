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
} from './index'

$currentId.on(setCurrentId, (_, currentId) => currentId).reset(resetCurrentId)
$hoveredId.on(cardHovered, (_, id) => id).reset(cardLeaved)

sample({
  source: $cards,
  clock: $currentId,
  fn: (cards, id) => cards.find((card) => card.id === id) || null,
  target: $currentCard,
})
