import { $cards, addCard, setCards } from './index'

$cards
  .on(setCards, (_, cards) => cards)
  .on(addCard, (cards, card) => cards.concat(card))

setCards([
  { title: 'CI/CD' },
  { title: 'Google Auth' },
  { title: 'Forgot Password' },
  { title: 'IPR' },
])
