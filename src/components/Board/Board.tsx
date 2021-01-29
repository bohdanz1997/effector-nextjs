import * as React from 'react'
import styled from 'styled-components'
import { useEvent } from 'effector-react'
import * as Reakit from 'reakit'
import { useDialogState } from 'reakit'
import { boardClicked } from 'models/board'
import { AddList, ListsWithCards } from '../List'
import { Button, ButtonGroup, MenuButton } from '../Button'
import { ContextMenu } from '../ContextMenu/ContextMenu'

export const Board: React.FC = () => {
  const events = useEvent({
    boardClicked,
  })
  const mainRef = React.useRef<HTMLDivElement>(null)
  const dialog = useDialogState()

  return (
    <Main
      ref={mainRef}
      onClick={(event) => {
        if (mainRef.current && event.target === mainRef.current) {
          events.boardClicked()
        }
      }}
    >
      <Navbar>
        <ButtonGroup>
          <Reakit.Button disabled as={Button} focusable>
            Reakit
          </Reakit.Button>

          <Reakit.DialogDisclosure {...dialog}>
            Open Dialog
          </Reakit.DialogDisclosure>
          <Reakit.DialogBackdrop {...dialog}>
            <Reakit.Dialog {...dialog}>Welcome Dialog</Reakit.Dialog>
          </Reakit.DialogBackdrop>

          <Button>Foo action</Button>
          <Button>Foo action</Button>
          <Button>Foo action</Button>
        </ButtonGroup>
        <ContextMenu />
      </Navbar>
      <Container>
        <ListsWithCards />
        <AddList />
      </Container>
    </Main>
  )
}

const Main = styled.main`
  height: 100vh;
  padding: var(--p2) var(--p1);
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const Navbar = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  margin: 0 var(--p1) var(--p2);
  height: 40px;
`
