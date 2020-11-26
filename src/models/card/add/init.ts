import { sample } from 'effector'
import { addCard } from '../../cards'
import {
  $isEditing,
  $title,
  buttonClicked,
  enterPressed,
  titleChanged,
} from './index'

$isEditing.on(buttonClicked, () => true).on(enterPressed, () => false)

$title.on(titleChanged, (_, title) => title).reset(addCard)

sample({
  source: $title,
  clock: enterPressed,
  fn: (title) => ({ title }),
  target: addCard,
})
