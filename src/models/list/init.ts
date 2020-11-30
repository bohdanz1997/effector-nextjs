import { combine, guard, sample } from 'effector'

import {
  $lists,
  addList,
  createListFx,
  removeList,
  updateList,
  updateListFx,
} from '../lists'
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
  $hoveredId,
  listHovered,
  listLeft,
} from './index'

$mode
  .on(addButtonClicked, () => 'add')
  .on(listClicked, () => 'edit')
  .reset(boardClicked, addList, updateList)

$currentId
  .on([setCurrentId, listClicked], (_, currentId) => currentId)
  .reset(addList, updateList, removeList, boardClicked, cardsModel.addCard)

$hoveredId.on(listHovered, (_, id) => id).reset(listLeft)

$title
  .on(titleChanged, (_, title) => title)
  .reset(addList, updateList, removeList, boardClicked)

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

const addClicked = guard({
  source: enterPressed,
  filter: $isAdding,
})

sample({
  source: $title,
  clock: addClicked,
  fn: (title) => ({ title }),
  target: createListFx,
})

const $updateData = combine({
  id: $currentId,
  title: $title,
})

const editClicked = guard({
  source: enterPressed,
  filter: $isEditing,
})

sample({
  source: $updateData,
  clock: editClicked,
  // TODO: change so updateData.id will be not null
  fn: ({ id, title }) => ({
    id: id || 0,
    title,
  }),
  target: updateListFx,
})
