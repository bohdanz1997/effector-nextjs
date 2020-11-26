import * as React from 'react'
import styled from 'styled-components'
import { useStore } from 'effector-react'
import {
  $isEditing,
  $title,
  buttonClicked,
  keyPressed,
  titleChanged,
} from 'models/card/add'

import { AddButton } from '../Button/AddButton'

export const AddCard = () => {
  const isEditing = useStore($isEditing)
  const title = useStore($title)

  return (
    <Container>
      {isEditing ? (
        <Input
          autoFocus
          type="text"
          value={title}
          onChange={(e) => titleChanged(e.target.value)}
          onKeyPress={(e) => keyPressed(e.key)}
        />
      ) : (
        <AddButton onClick={() => buttonClicked()}>Add Card</AddButton>
      )}
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: var(--p2);
`

const Input = styled.input`
  height: 32px;
  font-size: var(--font-size3);
  width: 100%;
`
