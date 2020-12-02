import { app } from '../app'

export enum States {
  idle = 'idle',
  clicked = 'clicked',
  dragging = 'dragging',
  dropped = 'dropped',
}

type Target = {
  id: number
  offset: Position
  position: Position
}

export type Position = {
  x: number
  y: number
}

export type Ids = {
  [id: string]: number
}
export type CardIds = {
  [id: string]: {
    pixel: number
    listId: number
  }
}

const zeroPosition: Position = { x: 0, y: 0 }

export const targetClicked = app.createEvent<Target>()
export const targetDropped = app.createEvent<Position>()
export const cardUnderDropped = app.createEvent<number | null>()

export const targetDraggable = app.createEvent()
export const resetDragging = app.createEvent()
export const setPointerPosition = app.createEvent<Position>()

export const $state = app.createStore<States>(States.idle)
export const $target = app.createStore<number | null>(null)
export const $pointerPosition = app.createStore<Position>(zeroPosition)
export const $parentOffset = app.createStore<Position>(zeroPosition)
export const $targetPosition = app.createStore<Position>(zeroPosition)
export const $listXIds = app.createStore<Ids>({})
export const $cardYIds = app.createStore<CardIds>({})
