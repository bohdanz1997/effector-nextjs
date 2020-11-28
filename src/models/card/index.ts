import { app } from '../app'

export const titleChanged = app.createEvent<string>()
export const keyPressed = app.createEvent<string>()
export const enterPressed = keyPressed.filter({
  fn: (key) => key === 'Enter',
})

export const $title = app.createStore<string>('')

export { $currentId, $hoveredId, cardHovered, cardLeaved } from './current'
export { $isAdding, addButtonClicked } from './add'
export { $isEditing, cardClicked } from './edit'
