import { combine, guard, sample } from 'effector'
import { uuid } from 'lib/uuid'
import { boardClicked } from '../board'
import { $cards, addCard, Card, removeCardById, updateCard } from '../cards'
import * as listModel from '../list'
import {
  $currentId,
  $isEditing,
  addButtonClicked,
  enterPressed,
  setCurrentId,
  titleClicked,
  $title,
  titleChanged,
  $isAdding,
} from './index'

$isAdding.on(addButtonClicked, () => true).reset(boardClicked, addCard)
$isEditing.on(titleClicked, () => true).reset(boardClicked, updateCard)

$currentId
  .on([setCurrentId, titleClicked], (_, currentId) => currentId)
  .reset(addCard, updateCard, removeCardById, boardClicked)

$title
  .on(titleChanged, (_, title) => title)
  .reset(addCard, updateCard, removeCardById, boardClicked)

$isAdding.watch((v) => console.log('card adding', v))
$isEditing.watch((v) => console.log('card editing', v))

const defaultCard: Card = {
  id: 0,
  title: '',
  listId: 0,
}

const $currentCard = combine(
  $cards,
  $currentId,
  (cards, id) => cards.find((card) => card.id === id) || defaultCard,
)

sample({
  source: $currentCard,
  clock: titleClicked,
  fn: (card) => card.title,
  target: $title,
})

const $createData = combine({
  title: $title,
  listId: listModel.$currentId,
})

sample({
  source: $createData,
  clock: guard({
    source: enterPressed,
    filter: $isAdding.map(Boolean),
  }),
  fn: ({ title, listId }) => ({
    id: uuid(),
    title,
    listId,
  }),
  target: addCard,
})

const $updateData = combine($currentCard, $title, (card, title) => ({
  ...card,
  title,
}))

sample({
  source: $updateData,
  clock: guard({
    source: enterPressed,
    filter: $isEditing.map(Boolean),
  }),
  target: updateCard,
})

// $currentId.watch((v) => console.log('card currentID', v))
// $isAdding.watch((v) => console.log('card adding', v))
// $isEditing.watch((v) => console.log('card editing', v))
