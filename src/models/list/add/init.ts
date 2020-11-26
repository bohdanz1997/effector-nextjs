import { sample } from 'effector'
import { uuid } from 'lib/uuid'

import { addList } from '../../lists'
import {
  $isEditing,
  $title,
  buttonClicked,
  enterPressed,
  titleChanged,
} from './index'

$isEditing.on(buttonClicked, () => true).on(enterPressed, () => false)

$title.on(titleChanged, (_, title) => title).reset(addList)

sample({
  source: $title,
  clock: enterPressed,
  fn: (title) => ({
    title,
    id: uuid(),
  }),
  target: addList,
})
