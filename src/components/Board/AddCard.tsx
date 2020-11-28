import * as React from 'react'
import styled from 'styled-components'
import { useEvent, useStore } from 'effector-react/ssr'
import * as listModel from 'models/list'
import {
  $title,
  titleChanged,
  keyPressed,
  $isAdding,
  addButtonClicked,
} from 'models/card'

import { AddButton } from '../Button/AddButton'
import { Input } from '../Input'

type Props = {
  listId: number
}

export const AddCard: React.FC<Props> = ({ listId }) => {
  const events = useEvent({
    titleChanged,
    keyPressed,
    addButtonClicked,
  })
  const isAdding = useStore($isAdding)
  const title = useStore($title)
  const currentListId = useStore(listModel.$currentId)

  const showInput = isAdding && currentListId === listId

  return (
    <Container>
      {showInput ? (
        <Input
          autoFocus
          type="text"
          value={title}
          onChange={(e) => events.titleChanged(e.target.value)}
          onKeyPress={(e) => events.keyPressed(e.key)}
        />
      ) : (
        <AddButton onClick={() => events.addButtonClicked(listId)}>
          Add Card
        </AddButton>
      )}
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: var(--p2);
`
