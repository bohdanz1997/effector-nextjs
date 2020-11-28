import { combine, guard, sample } from 'effector'
import { uuid } from 'lib/uuid'

import { $lists, addList, removeListById, updateList } from '../lists'
import { boardClicked } from '../board'
import * as cardsModel from '../cards'
import {
  $currentId,
  $isAdding,
  $isEditing,
  $mode,
  $title,
  addButtonClicked,
  enterPressed,
  setCurrentId,
  titleChanged,
  listClicked,
} from './index'

$mode
  .on(addButtonClicked, () => 'add')
  .on(listClicked, () => 'edit')
  .reset(boardClicked, addList, updateList)

$currentId
  .on([setCurrentId, listClicked], (_, currentId) => currentId)
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
  clock: listClicked,
  fn: (list) => (list ? list.title : ''),
  target: $title,
})

sample({
  source: $title,
  clock: guard({
    source: enterPressed,
    filter: $isAdding,
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
    filter: $isEditing,
  }),
  target: updateList,
})

// $currentId.watch((v) => console.log('list currentID', v))
// $isEditing.watch((v) => console.log('list editing', v))
