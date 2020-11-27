import { combine, guard, sample } from 'effector'
import { uuid } from 'lib/uuid'

import { $lists, addList, removeListById, updateList } from '../lists'
import { boardClicked } from '../board'
import {
  $currentId,
  $isEditing,
  $title,
  addButtonClicked,
  enterPressed,
  setCurrentId,
  titleChanged,
  titleClicked,
} from './index'

$isEditing
  .on(titleClicked, () => true)
  .on(addButtonClicked, () => true)
  .reset(boardClicked, enterPressed)

$currentId
  .on([setCurrentId, titleClicked], (_, currentId) => currentId)
  .reset(addList, removeListById, boardClicked)

$title
  .on(titleChanged, (_, title) => title)
  .reset(addList, removeListById, boardClicked)

const $isEditMode = $currentId.map(Boolean)
const $isCreateMode = $currentId.map((id) => !id)

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
    filter: $isCreateMode,
  }),
  fn: (title) => ({
    id: uuid(),
    title,
  }),
  target: addList,
})

sample({
  source: {
    id: $currentId,
    title: $title,
  },
  clock: guard({
    source: enterPressed,
    filter: $isEditMode,
  }),
  target: updateList,
})
