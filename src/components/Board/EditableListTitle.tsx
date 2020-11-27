import React from 'react'
import styled from 'styled-components'
import { useEvent, useStore } from 'effector-react/ssr'
import {
  $currentId,
  $isEditing,
  $title,
  titleClicked,
  titleInputChanged,
  titleInputKeyPressed,
} from 'models/list'

import { Input } from '../Input'

type Props = {
  id: number
  title: string
}

export const EditableListTitle = ({ id, title }: Props) => {
  const isEditing = useStore($isEditing)
  const titleValue = useStore($title)
  const currentId = useStore($currentId)
  const events = useEvent({
    titleClicked,
    titleInputChanged,
    titleInputKeyPressed,
  })

  const showInput = isEditing && currentId === id

  return showInput ? (
    <Input
      autoFocus
      type="text"
      value={titleValue}
      onChange={events.titleInputChanged}
      onKeyPress={events.titleInputKeyPressed}
    />
  ) : (
    <Title onClick={() => events.titleClicked(id)}>{title}</Title>
  )
}

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--p2);
  font-size: var(--font-size4);
  font-weight: bold;
`
