import { app } from 'models/app'

export const addButtonClicked = app.createEvent<number>()

export const $isAdding = app.createStore<boolean>(false)
