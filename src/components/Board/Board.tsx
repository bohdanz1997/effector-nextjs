import * as React from 'react'
import styled from 'styled-components'
import { useEvent, useStore } from 'effector-react'
import { boardClicked } from 'models/board'
import {
  $listXIds,
  $cardYIds,
  targetDropped,
  $pointerPosition,
} from 'models/dragdrop'
import { AddList, ListsWithCards } from '../List'
import { DraggableTarget } from '../DragDrop/Target'

export const Board: React.FC = () => {
  const events = useEvent({
    boardClicked,
    targetDropped,
  })
  const mainRef = React.useRef<HTMLDivElement>(null)
  const xids = useStore($listXIds)
  const yids = useStore($cardYIds)
  console.log('xids', xids)
  console.log('yids', yids)

  return (
    <Main
      ref={mainRef}
      onClick={(event) => {
        if (mainRef.current && event.target === mainRef.current) {
          events.boardClicked()
        }
      }}
      onMouseUp={(event) =>
        events.targetDropped({
          x: event.clientX,
          y: event.clientY,
        })
      }
    >
      <Container>
        <ListsWithCards />
        <AddList />
      </Container>
      <DraggableTarget />
      <DebugView />
    </Main>
  )
}

const DebugView = () => {
  const position = useStore($pointerPosition)

  return (
    <Debug>
      <div>x: {position.x}</div>
      <div>y: {position.y}</div>
    </Debug>
  )
}

const Debug = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 1rem;
`

const Main = styled.main`
  height: 100vh;
  padding: var(--p2) var(--p1);
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
`
