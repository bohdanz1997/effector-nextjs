import { combine, guard, sample } from 'effector'
import { uuid } from 'lib/uuid'
import { boardClicked } from '../board'
import { $cards, addCard, Card, removeCardById, updateCard } from '../cards'
import * as listModel from '../list'
import { app } from '../app'
import {
  $currentId,
  $isEditing,
  addButtonClicked,
  enterPressed,
  setCurrentId,
  cardClicked,
  $title,
  titleChanged,
  $isAdding,
  cardHovered,
  cardLeaved,
  $hoveredId,
} from './index'

$isAdding.on(addButtonClicked, () => true).reset(boardClicked, addCard)
$isEditing.on(cardClicked, () => true).reset(boardClicked, updateCard)

$currentId
  .on([setCurrentId, cardClicked], (_, currentId) => currentId)
  .reset(addCard, updateCard, removeCardById, boardClicked)

$title
  .on(titleChanged, (_, title) => title)
  .reset(addCard, updateCard, removeCardById, boardClicked)

$hoveredId.on(cardHovered, (_, id) => id).reset(cardLeaved)

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
  clock: cardClicked,
  fn: (card) => card.title,
  target: $title,
})

const addNewCard = app.createEvent<{
  id: number
  title: string
  listId: number | null
}>()

const $createCardData = combine(
  $title,
  listModel.$currentId,
  (title, listId) => ({
    id: uuid(),
    title,
    listId,
  }),
)

sample({
  source: $createCardData,
  clock: guard({
    source: enterPressed,
    filter: $isAdding.map(Boolean),
  }),
  target: addNewCard,
})

guard({
  source: addNewCard,
  filter: listModel.$currentId.map(Boolean),
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
