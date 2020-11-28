import * as React from 'react'
import { useList } from 'effector-react/ssr'
import { $listsWithCards } from 'models/board'

import { List } from './List'
import { CardView } from './Card'
import { AddCard } from './AddCard'
import { ListTitle } from './ListTitle'
import { CardTitle } from './CardTitle'

export const ListsWithCards = () =>
  useList($listsWithCards, (list) => (
    <List title={<ListTitle id={list.id} title={list.title} />}>
      {list.cards.map((card) => (
        <CardView
          key={card.id}
          title={<CardTitle id={card.id} title={card.title} />}
        />
      ))}
      <AddCard listId={list.id} />
    </List>
  ))
