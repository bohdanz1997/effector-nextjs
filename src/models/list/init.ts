import { combine, guard, sample } from 'effector'
import { uuid } from 'lib/uuid'

import { $lists, addList, removeListById, updateList } from '../lists'
import { boardClicked } from '../board'
import * as cardsModel from '../cards'
import {
  $currentId,
  $isAdding,
  $isEditing,
  $title,
  addButtonClicked,
  enterPressed,
  setCurrentId,
  titleChanged,
  titleClicked,
} from './index'

$isAdding.on(addButtonClicked, () => true).reset(boardClicked, addList)
$isEditing.on(titleClicked, () => true).reset(boardClicked, updateList)

$currentId
  .on([setCurrentId, titleClicked], (_, currentId) => currentId)
  .reset(addList, updateList, removeListById, boardClicked, cardsModel.addCard)

$title
  .on(titleChanged, (_, title) => title)
  .reset(addList, updateList, removeListById, boardClicked)

const $currentList = combine(
  $lists,
  $currentId,
  (lists, id) => lists.find((list) => list.id === id) || null,
)

sample({
  source: $currentList,
  clock: titleClicked,
  fn: (list) => (list ? list.title : ''),
  target: $title,
})

sample({
  source: $title,
  clock: guard({
    source: enterPressed,
    filter: $isAdding.map(Boolean),
  }),
  fn: (title) => ({
    id: uuid(),
    title,
  }),
  target: addList,
})

const $updateData = combine({
  id: $currentId,
  title: $title,
})

sample({
  source: $updateData,
  clock: guard({
    source: enterPressed,
    filter: $isEditing.map(Boolean),
  }),
  target: updateList,
})

// $currentId.watch((v) => console.log('list currentID', v))
// $isEditing.watch((v) => console.log('list editing', v))
