import * as React from 'react'
import { useEvent, useStore } from 'effector-react'
import {
  $isAdding,
  $title,
  addButtonClicked,
  titleChanged,
  keyPressed,
} from 'models/list'

import { AddButton } from '../Button'
import { EditableInput } from '../Input'
import { ListWrapper } from './ListView'

export const AddList = () => {
  const events = useEvent({
    addButtonClicked,
    titleChanged,
    keyPressed,
  })
  const isAdding = useStore($isAdding)
  const title = useStore($title)

  return (
    <ListWrapper>
      {isAdding ? (
        <EditableInput
          value={title}
          onChange={events.titleChanged}
          onKeyPress={events.keyPressed}
        />
      ) : (
        <AddButton onClick={() => events.addButtonClicked()}>
          Add another list
        </AddButton>
      )}
    </ListWrapper>
  )
}
