import { request } from '../request'
import {
  $cards,
  addCard,
  fetchCardsFx,
  removeCardById,
  setCards,
  updateCard,
} from './index'

fetchCardsFx.use(() =>
  request({
    path: '/cards',
    method: 'GET',
  }),
)

$cards
  .on([setCards, fetchCardsFx.doneData], (_, cards) => cards)
  .on(addCard, (cards, card) => cards.concat(card))
  .on(updateCard, (cards, newCard) =>
    cards.map((card) => (card.id === newCard.id ? newCard : card)),
  )
  .on(removeCardById, (cards, id) => cards.filter((card) => card.id !== id))
