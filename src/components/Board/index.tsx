import * as React from 'react'
import styled from 'styled-components'
import { useList } from 'effector-react'
import { $cards } from 'models/cards'

import { Card } from '../Card/Card'
import { AddButton } from '../Button/AddButton'
import { List, ListWrapper } from './List'
import { AddCard } from './AddCard'

export const Board: React.FC = () => {
  const cards = useList($cards, (card) => <Card title={card.title} />)

  return (
    <Main>
      <Container>
        <List title="TITLE">
          {cards}
          <AddCard />
        </List>
        <ListWrapper>
          <AddButton>Add Column</AddButton>
        </ListWrapper>
      </Container>
    </Main>
  )
}

const Main = styled.main`
  height: 100vh;
  background-color: var(--board-bg);
  padding: var(--p2) var(--p1);
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
`
