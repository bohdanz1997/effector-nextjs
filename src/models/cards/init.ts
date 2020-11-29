import { forward } from 'effector'
import { request } from '../request'
import {
  $cards,
  addCard,
  createCardFx,
  fetchCardsFx,
  removeCard,
  removeCardFx,
  setCards,
  updateCard,
  updateCardFx,
} from './index'

fetchCardsFx.use(() => request('/cards', 'GET'))
createCardFx.use((card) =>
  request('/cards', 'POST', {
    data: card,
  }),
)
updateCardFx.use((card) =>
  request(`/cards/${card.id}`, 'PUT', {
    data: card,
  }),
)
removeCardFx.use((id) => request(`/cards/${id}`, 'DELETE'))

$cards
  .on(setCards, (_, cards) => cards)
  .on(addCard, (cards, card) => cards.concat(card))
  .on(updateCard, (cards, newCard) =>
    cards.map((card) => (card.id === newCard.id ? newCard : card)),
  )
  .on(removeCard, (cards, id) => cards.filter((card) => card.id !== id))

forward({
  from: createCardFx.doneData,
  to: addCard,
})

forward({
  from: fetchCardsFx.doneData,
  to: setCards,
})

forward({
  from: updateCardFx.doneData,
  to: updateCard,
})

forward({
  from: removeCardFx.doneData,
  to: removeCard,
})
