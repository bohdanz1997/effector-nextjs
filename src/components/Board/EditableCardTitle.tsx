import { useEvent, useStore } from 'effector-react/ssr'
import React from 'react'
import {
  $isEditing,
  $title,
  $currentId,
  titleClicked,
  titleChanged,
  keyPressed,
} from 'models/card'
import { Input } from '../Input'
import { Title } from './Card'

type Props = {
  id: number
  title: string
}

export const EditableCardTitle = ({ id, title }: Props) => {
  const isEditing = useStore($isEditing)
  const titleValue = useStore($title)
  const currentId = useStore($currentId)
  const events = useEvent({
    titleClicked,
    titleChanged,
    keyPressed,
  })

  const showInput = isEditing && currentId === id

  return (
    <Title onClick={() => events.titleClicked(id)}>
      {showInput ? (
        <Input
          autoFocus
          type="text"
          value={titleValue}
          onChange={(e) => events.titleChanged(e.target.value)}
          onKeyPress={(e) => events.keyPressed(e.key)}
        />
      ) : (
        <>{title}</>
      )}
    </Title>
  )
}
