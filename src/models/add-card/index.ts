import * as React from 'react'
import { app } from '../app'

export const keyPressed = app.createEvent<string>()
export const titleChanged = app.createEvent<string>()
export const buttonClicked = app.createEvent<React.MouseEvent>()

export const enterPressed = keyPressed.filter({
  fn: (key) => key === 'Enter',
})

export const $isEditing = app.createStore<boolean>(false)
export const $title = app.createStore<string>('')
