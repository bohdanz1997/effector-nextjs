import { app } from '../../app'

export const listClicked = app.createEvent<number>()
export const setEditingId = app.createEvent<number>()
export const $editingId = app.createStore<number | null>(null)
