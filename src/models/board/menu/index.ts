import { app } from '../../app'

const labels = {
  GREEN: 'Green',
  RED: 'red',
  BLUE: 'blue',
}

const labelsChecked = {
  [labels.GREEN]: false,
  [labels.RED]: false,
  [labels.BLUE]: false,
}

type LabelMap = {
  [id: string]: boolean
}

export const menuClicked = app.createEvent()
export const labelClicked = app.createEvent<{ id: string; checked: boolean }>()

export const $isOpen = app.createStore<boolean>(false)
export const $labelsChecked = app.createStore<LabelMap>(labelsChecked)
export const $labelsOptions = $labelsChecked.map((labelsChecked) =>
  Object.entries(labelsChecked).map(([id, checked]) => ({ id, checked })),
)
