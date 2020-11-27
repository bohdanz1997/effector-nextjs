import React from 'react'
import { app } from '../app'

type ChangeInputEvent = React.ChangeEvent<HTMLInputElement>
type KeyboardInputEvent = React.KeyboardEvent<HTMLInputElement>

export const setCurrentId = app.createEvent<number>()

export const addButtonClicked = app.createEvent()
export const titleClicked = app.createEvent<number>()
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

export const $isEditing = app.createStore<boolean>(false)
export const $currentId = app.createStore<number>(0)

export const $title = app.createStore<string>('')
