import * as React from 'react'
import styled from 'styled-components'
import { useStore } from 'effector-react'
import { sample } from 'effector'

import { AddButton } from '../Button/AddButton'
import { addCard } from '../../models/board'
import { app } from '../../models/app'

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
        <AddButton onClick={() => buttonClicked()}>
          Add Card
        </AddButton>
      )}
    </Container>
  )
}

const keyPressed = app.createEvent<string>()
const titleChanged = app.createEvent<string>()
const buttonClicked = app.createEvent()

const enterPressed = keyPressed.filter({
  fn: (key) => key === 'Enter',
})

const $isEditing = app.createStore<boolean>(false)
  .on(buttonClicked, () => true)
  .on(enterPressed, () => false)

const $title = app.createStore<string>('')
  .on(titleChanged, (_, title) => title)
  .reset(addCard)

sample({
  source: $title,
  clock: enterPressed,
  fn: (title) => ({ title }),
  target: addCard,
})

const Container = styled.div`
  margin-bottom: var(--p2);
`

const Input = styled.input`
  height: 32px;
  font-size: var(--font-size3);
  width: 100%;
`
