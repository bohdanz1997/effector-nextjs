import { app } from 'models/app'

export const cardClicked = app.createEvent<number>()
export const $isEditing = app.createStore<boolean>(false)
