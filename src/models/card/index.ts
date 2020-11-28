import { app } from '../app'

export const titleChanged = app.createEvent<string>()
export const keyPressed = app.createEvent<string>()
export const enterPressed = keyPressed.filter({
  fn: (key) => key === 'Enter',
})
export const cardHovered = app.createEvent<number>()
export const cardLeaved = app.createEvent<number>()

export const $title = app.createStore<string>('')
export const $hoveredId = app.createStore<number | null>(null)

export { $currentId } from './current'
export { $isAdding, addButtonClicked } from './add'
export { $isEditing, cardClicked } from './edit'
