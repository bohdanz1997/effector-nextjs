import { app } from '../app'
import { Mode } from './types'

export const setCurrentId = app.createEvent<number>()

export const listHovered = app.createEvent<number>()
export const listLeft = app.createEvent<number>()
export const addButtonClicked = app.createEvent()
export const listClicked = app.createEvent<number>()
export const titleChanged = app.createEvent<string>()
export const keyPressed = app.createEvent<string>()
export const enterPressed = keyPressed.filter({
  fn: (key) => key === 'Enter',
})

export const $mode = app.createStore<Mode>('none')
export const $isAdding = $mode.map((mode) => mode === 'add')
export const $isEditing = $mode.map((mode) => mode === 'edit')
export const $hoveredId = app.createStore<number | null>(null)
export const $currentId = app.createStore<number | null>(null)
export const $title = app.createStore<string>('')
