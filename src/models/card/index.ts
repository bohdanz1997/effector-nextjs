import { app } from '../app'

export const setCurrentId = app.createEvent<number>()
export const addButtonClicked = app.createEvent<number>()
export const titleClicked = app.createEvent<number>()
export const titleChanged = app.createEvent<string>()
export const keyPressed = app.createEvent<string>()
export const enterPressed = keyPressed.filter({
  fn: (key) => key === 'Enter',
})

export const $isAdding = app.createStore<boolean>(false)
export const $isEditing = app.createStore<boolean>(false)
export const $currentId = app.createStore<number>(0)
export const $title = app.createStore<string>('')
