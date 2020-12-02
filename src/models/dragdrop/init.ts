import { combine, forward, guard, restore, sample } from 'effector'
import arrayMove from 'array-move'

import {
  $parentOffset,
  $pointerPosition,
  $state,
  $target,
  $targetPosition,
  $listXIds,
  $cardYIds,
  Ids,
  Position,
  resetDragging,
  setPointerPosition,
  States,
  targetClicked,
  targetDraggable,
  targetDropped,
  CardIds,
  cardUnderDropped,
} from './index'
import { $lists } from '../lists'
import { $cards, Card } from '../cards'
import { dimensions } from '../../lib/dimensions'
import { splitArray } from '../../lib/array'

const targetClickedOffset = targetClicked.map(({ offset }) => offset)
const targetClickedPosition = targetClicked.map(({ position }) => position)

$state
  .on(targetClicked, () => States.clicked)
  .on(targetDraggable, () => States.dragging)
  .on(targetDropped, () => States.dropped)
  .reset(resetDragging)

$target.on(targetClicked, (_, { id }) => id).reset(resetDragging)
$pointerPosition
  .on(setPointerPosition, (_, position) => position)
  .reset(resetDragging)

$parentOffset
  .on(targetClickedOffset, (_, offset) => offset)
  .reset(resetDragging)

const $isDragging = $state.map((state) => state === States.dragging)

type Item = { id: number }

type Params = {
  index: number
  itemSize: number
  itemGap: number
  offset: number
}

const calculatePixel = ({
  index,
  itemSize,
  itemGap,
  offset,
}: Params): number => {
  const gap = index === 0 ? 0 : itemGap
  return (itemSize + gap) * index + offset
}

const getListXIds = (items: Item[]): Ids =>
  items.reduce((ids, list, index) => {
    ids[list.id] = calculatePixel({
      index,
      itemSize: dimensions.listWidth,
      itemGap: dimensions.listGap,
      offset: dimensions.boardPadding,
    })
    return ids
  }, {} as Ids)

const getCardYIds = (cards: Card[]): CardIds => {
  const groups = splitArray(cards, (card) => [String(card.listId), card])

  return Object.values(groups).reduce((result, cards) => {
    const currentResult = cards.reduce((ids, card, index) => {
      const pixel = calculatePixel({
        index,
        itemSize: dimensions.cardHeight,
        itemGap: dimensions.cardGap,
        offset: dimensions.boardPadding + dimensions.listTitleHeight,
      })
      const { listId } = card
      ids[card.id] = { pixel, listId }
      return ids
    }, {} as CardIds)
    return {
      ...result,
      ...currentResult,
    }
  }, {})
}

sample({
  source: $lists,
  fn: getListXIds,
  target: $listXIds,
})

sample({
  source: $cards,
  // TODO: calculate cards positions relatively to list
  fn: getCardYIds,
  target: $cardYIds,
})

sample({
  source: $cardYIds,
  clock: targetDropped,
  fn: (ids, pos) => {
    const listId = 8
    const finalIds = Object.entries(ids).reduce((result, [id, value]) => {
      if (value.listId === listId) {
        result[id] = value
      }
      return result
    }, {} as CardIds)

    const cardIds = Object.keys(finalIds)
    const pixels = Object.values(finalIds).map(({ pixel }) => pixel)
    const index = pixels.findIndex((pixel) => pos.y < pixel)

    if (index >= 0) {
      const cardId = cardIds[index - 1]
      console.log({ cardId })
      return Number(cardId)
    }
    return null
  },
  target: cardUnderDropped,
})

const $lastTarget = restore(targetClicked, null)

sample({
  source: combine({
    target: $lastTarget,
    cards: $cards,
  }),
  clock: cardUnderDropped,
  fn: ({ cards, target }, cardIdUnder) => {
    if (target && cardIdUnder) {
      console.log(target.id, cardIdUnder)
      const from = cards.findIndex((card) => card.id === target.id)
      const to = cards.findIndex((card) => card.id === cardIdUnder)
      console.log('move', { from, to })
      return arrayMove(cards, from, to)
    }
    return cards
  },
  target: $cards,
})

const calculatePosition = (position: Position, offset: Position): Position => ({
  x: Number.parseInt(String(position.x - offset.x), 10),
  y: Number.parseInt(String(position.y - offset.y), 10),
})

sample({
  source: $pointerPosition,
  clock: targetClickedOffset,
  fn: calculatePosition,
  target: $targetPosition,
})

sample({
  source: $parentOffset,
  clock: guard({
    source: $pointerPosition,
    filter: $isDragging,
  }),
  fn: (offset, pointer) => calculatePosition(pointer, offset),
  target: $targetPosition,
})

forward({
  from: targetClicked,
  to: targetDraggable,
})

forward({
  from: targetDropped,
  to: resetDragging,
})
