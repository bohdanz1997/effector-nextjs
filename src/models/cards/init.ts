import { $cards, addCard, setCards } from './index'

$cards
  .on(setCards, (_, cards) => cards)
  .on(addCard, (cards, card) => cards.concat(card))
