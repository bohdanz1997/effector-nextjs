import * as React from 'react'
import styled from 'styled-components'
import { useList } from 'effector-react'
import { combine } from 'effector'
import { $cards } from 'models/cards'

import { CardView } from '../Card/Card'
import { $lists } from '../../models/lists'
import { Card } from '../../models/cards/types'
import { List, ListWrapper } from './List'
import { AddCard } from './AddCard'
import { AddList } from './AddList'

export const Board: React.FC = () => {
  return (
    <Main>
      <Container>
        <ListsWithCards />
        <ListWrapper>
          <AddList />
        </ListWrapper>
      </Container>
    </Main>
  )
}

const ListsWithCards = () => {
  return useList($listsWithCards, {
    fn: (list) => (
      <List title={list.title}>
        {list.cards.map((card) => (
          <CardView title={card.title} key={card.id} />
        ))}
        <AddCard listId={list.id} />
      </List>
    ),
  })
}

type CardsById = { [id: number]: Card }

const $cardsById = $cards.map((cards) =>
  cards.reduce((byId, card) => {
    byId[card.id] = card
    return card
  }, {} as CardsById),
)

const $listsWithCards = combine($lists, $cards, (lists, cards) =>
  lists.map((list) => ({
    ...list,
    cards: cards.filter((card) => list.id === card.listId),
  })),
)

const Main = styled.main`
  height: 100vh;
  background-color: var(--board-bg);
  padding: var(--p2) var(--p1);
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
`
