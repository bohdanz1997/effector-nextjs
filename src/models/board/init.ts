import './menu/init'
import { forward } from 'effector'

import * as cardModel from '../card'
import * as listModel from '../list'
import { fetchCardsFx } from '../cards'
import { fetchListsFx } from '../lists'
import { initializeBoard } from './index'

forward({
  from: cardModel.addButtonClicked,
  to: listModel.setCurrentId,
})

forward({
  from: initializeBoard,
  to: [fetchCardsFx, fetchListsFx],
})
