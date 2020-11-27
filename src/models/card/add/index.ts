import React from 'react'
import { app } from '../../app'

export const keyPressed = app.createEvent<string>()
export const titleChanged = app.createEvent<string>()
export const setActiveListId = app.createEvent<number>()

export const titleInputChanged = titleChanged.prepend(
  (e: React.ChangeEvent<HTMLInputElement>) => e.target.value,
)
export const titleInputKeyPressed = keyPressed.prepend(
  (e: React.KeyboardEvent<HTMLInputElement>) => e.key,
)

export const enterPressed = keyPressed.filter({
  fn: (key) => key === 'Enter',
})

export const $isEditing = app.createStore<boolean>(false)
export const $title = app.createStore<string>('')
export const $activeListId = app.createStore<number>(0)
