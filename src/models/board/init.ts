import { forward } from 'effector'

import { $cards } from '../cards'
import * as cardModel from '../card'
import * as listModel from '../list'

forward({
  from: cardModel.addButtonClicked,
  to: listModel.setCurrentId,
})

$cards.watch((v) => console.log('cards', v))
