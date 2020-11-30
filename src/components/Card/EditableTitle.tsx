import React from 'react'
import { useEvent, useStore } from 'effector-react'
import { $title, keyPressed, titleChanged } from 'models/card'

import { EditableInput } from '../Input'

export const EditableTitle: React.FC = () => {
  const title = useStore($title)
  const events = useEvent({
    titleChanged,
    keyPressed,
  })

  return (
    <EditableInput
      value={title}
      onChange={events.titleChanged}
      onKeyPress={events.keyPressed}
    />
  )
}
