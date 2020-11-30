import React from 'react'
import { useEvent, useStore } from 'effector-react'
import { $title, titleInputChanged, titleInputKeyPressed } from 'models/list'

import { Input } from '../Input'

export const EditableTitle: React.FC = () => {
  const titleValue = useStore($title)
  const events = useEvent({
    titleInputChanged,
    titleInputKeyPressed,
  })

  return (
    <Input
      autoFocus
      type="text"
      value={titleValue}
      onChange={events.titleInputChanged}
      onKeyPress={events.titleInputKeyPressed}
    />
  )
}
