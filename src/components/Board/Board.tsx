import * as React from 'react'
import styled from 'styled-components'
import { useEvent } from 'effector-react/ssr'
import { boardClicked } from 'models/board'
import { ListWrapper } from './List'
import { AddList } from './AddList'
import { ListsWithCards } from './ListsWithCards'

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

const Main = styled.main`
  height: 100vh;
  background-color: var(--board-bg);
  padding: var(--p2) var(--p1);
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
`
