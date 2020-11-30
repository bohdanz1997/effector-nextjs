import * as React from 'react'
import styled from 'styled-components'
import { useEvent, useStore } from 'effector-react'
import * as listModel from 'models/list'
import {
  $title,
  titleChanged,
  keyPressed,
  $isAdding,
  addButtonClicked,
} from 'models/card'

import { AddButton } from '../Button'
import { EditableInput } from '../Input'

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
        <EditableInput
          value={title}
          onChange={events.titleChanged}
          onKeyPress={events.keyPressed}
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
