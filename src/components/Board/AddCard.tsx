import * as React from 'react'
import styled from 'styled-components'
import { useStore } from 'effector-react/ssr'
import {
  $activeListId,
  $isEditing,
  $title,
  setActiveListId,
  titleInputChanged,
  titleInputKeyPressed,
} from 'models/card/add'

import { AddButton } from '../Button/AddButton'
import { Input } from '../Input'

type Props = {
  listId: number
}

export const AddCard: React.FC<Props> = ({ listId }) => {
  const isEditing = useStore($isEditing)
  const title = useStore($title)
  const activeListId = useStore($activeListId)
  const showInput = isEditing && activeListId === listId

  return (
    <Container>
      {showInput ? (
        <Input
          autoFocus
          type="text"
          value={title}
          onChange={titleInputChanged}
          onKeyPress={titleInputKeyPressed}
        />
      ) : (
        <AddButton onClick={() => setActiveListId(listId)}>Add Card</AddButton>
      )}
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: var(--p2);
`
