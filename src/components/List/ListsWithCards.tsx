import * as React from 'react'
import { useList } from 'effector-react'
import { $listsWithCards } from 'models/board'

import { CardView, AddCard } from '../Card'
import { ListView } from './ListView'

export const ListsWithCards = () =>
  useList($listsWithCards, (list) => (
    <ListView list={list}>
      {list.cards.map((card) => (
        <CardView key={card.id} card={card} />
      ))}
      <AddCard listId={list.id} />
    </ListView>
  ))
