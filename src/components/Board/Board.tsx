import * as React from 'react'
import styled from 'styled-components'
import { useEvent, useList } from 'effector-react/ssr'
import { $listsWithCards, boardClicked } from 'models/board'

import { CardView } from './Card'
import { List, ListWrapper } from './List'
import { AddCard } from './AddCard'
import { AddList } from './AddList'
import { EditableListTitle } from './EditableListTitle'
import { EditableCardTitle } from './EditableCardTitle'

export const Board: React.FC = () => {
  const events = useEvent({
    boardClicked,
  })
  const mainRef = React.useRef<HTMLDivElement>(null)

  return (
    <Main
      ref={mainRef}
      onClick={(event) => {
        if (mainRef.current && event.target === mainRef.current) {
          events.boardClicked()
        }
      }}
    >
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
  return useList($listsWithCards, (list) => (
    <List title={<EditableListTitle id={list.id} title={list.title} />}>
      {list.cards.map((card) => (
        <CardView
          key={card.id}
          title={<EditableCardTitle id={card.id} title={card.title} />}
        />
      ))}
      <AddCard listId={list.id} />
    </List>
  ))
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
