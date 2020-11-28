import { $cards, addCard, removeCardById, setCards, updateCard } from './index'

$cards
  .on(setCards, (_, cards) => cards)
  .on(addCard, (cards, card) => cards.concat(card))
  .on(updateCard, (cards, newCard) =>
    cards.map((card) => (card.id === newCard.id ? newCard : card)),
  )
  .on(removeCardById, (cards, id) => cards.filter((card) => card.id !== id))
