import React from 'react'
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
import { Title, TitleText } from './List'

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

  return (
    <Title onClick={() => events.titleClicked(id)}>
      {showInput ? (
        <Input
          autoFocus
          type="text"
          value={titleValue}
          onChange={events.titleInputChanged}
          onKeyPress={events.titleInputKeyPressed}
        />
      ) : (
        <TitleText>{title}</TitleText>
      )}
    </Title>
  )
}
