import React from 'react'
import { app } from '../app'
import { Mode } from './types'

type ChangeInputEvent = React.ChangeEvent<HTMLInputElement>
type KeyboardInputEvent = React.KeyboardEvent<HTMLInputElement>

export const setCurrentId = app.createEvent<number>()

export const listHovered = app.createEvent<number>()
export const listLeft = app.createEvent<number>()
export const addButtonClicked = app.createEvent()
export const listClicked = app.createEvent<number>()
export const titleChanged = app.createEvent<string>()
export const keyPressed = app.createEvent<string>()
export const titleInputChanged = titleChanged.prepend(
  (e: ChangeInputEvent) => e.target.value,
)
export const titleInputKeyPressed = keyPressed.prepend(
  (e: KeyboardInputEvent) => e.key,
)
export const enterPressed = keyPressed.filter({
  fn: (key) => key === 'Enter',
})

export const $mode = app.createStore<Mode>('none')
export const $isAdding = $mode.map((mode) => mode === 'add')
export const $isEditing = $mode.map((mode) => mode === 'edit')
export const $hoveredId = app.createStore<number | null>(null)
export const $currentId = app.createStore<number | null>(null)
export const $title = app.createStore<string>('')
