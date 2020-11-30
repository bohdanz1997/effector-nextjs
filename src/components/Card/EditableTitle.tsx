import React from 'react'
import { useEvent, useStore } from 'effector-react'
import { $title, keyPressed, titleChanged } from 'models/card'

import { Input } from '../Input'

export const EditableTitle: React.FC = () => {
  const titleValue = useStore($title)
  const events = useEvent({
    titleChanged,
    keyPressed,
  })

  return (
    <Input
      autoFocus
      type="text"
      value={titleValue}
      onChange={(e) => events.titleChanged(e.target.value)}
      onKeyPress={(e) => events.keyPressed(e.key)}
    />
  )
}
