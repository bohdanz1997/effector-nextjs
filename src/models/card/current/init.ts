import { sample } from 'effector'
import { $cards } from 'models/cards'
import { $currentCard, $currentId, resetCurrentId, setCurrentId } from './index'

$currentId.on(setCurrentId, (_, currentId) => currentId).reset(resetCurrentId)

sample({
  source: $cards,
  clock: $currentId,
  fn: (cards, id) => cards.find((card) => card.id === id) || null,
  target: $currentCard,
})
