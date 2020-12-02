import { forward, sample } from 'effector'

import * as cardModel from '../card'
import * as listModel from '../list'
import { $target } from '../dragdrop'
import { $cards, fetchCardsFx } from '../cards'
import { fetchListsFx } from '../lists'
import { $targetCard, initializeBoard } from './index'

forward({
  from: cardModel.addButtonClicked,
  to: listModel.setCurrentId,
})

forward({
  from: initializeBoard,
  to: [fetchCardsFx, fetchListsFx],
})

sample({
  source: $cards,
  clock: $target,
  fn: (cards, id) => cards.find((card) => card.id === id) || null,
  target: $targetCard,
})
