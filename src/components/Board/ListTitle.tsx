import React from 'react'
import { useEvent, useStore } from 'effector-react/ssr'
import {
  $currentId,
  $isEditing,
  $title,
  listClicked,
  titleInputChanged,
  titleInputKeyPressed,
} from 'models/list'

import { Input } from '../Input'
import { Title, TitleText } from './List'

type Props = {
  id: number
  title: string
}

export const ListTitle = ({ id, title }: Props) => {
  const isEditing = useStore($isEditing)
  const titleValue = useStore($title)
  const currentId = useStore($currentId)
  const events = useEvent({
    listClicked,
    titleInputChanged,
    titleInputKeyPressed,
  })

  const showInput = isEditing && currentId === id

  return (
    <Title onClick={() => events.listClicked(id)}>
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
