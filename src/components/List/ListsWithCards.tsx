import * as React from 'react'
import { useList } from 'effector-react/ssr'
import { $listsWithCards } from 'models/board'

import { CardView, AddCard } from '../Card'
import { List } from './List'
import { ListTitle } from './ListTitle'

export const ListsWithCards = () =>
  useList($listsWithCards, (list) => (
    <List title={<ListTitle id={list.id} title={list.title} />}>
      {list.cards.map((card) => (
        <CardView key={card.id} card={card} />
      ))}
      <AddCard listId={list.id} />
    </List>
  ))
