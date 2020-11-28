import * as React from 'react'
import { useEvent, useStore } from 'effector-react/ssr'
import {
  $currentId,
  $title,
  $isAdding,
  addButtonClicked,
  titleInputChanged,
  titleInputKeyPressed,
} from 'models/list'

import { AddButton } from '../Button/AddButton'
import { Input } from '../Input'

export const AddList = () => {
  const events = useEvent({
    addButtonClicked,
    titleInputChanged,
    titleInputKeyPressed,
  })
  const isAdding = useStore($isAdding)
  const currentId = useStore($currentId)
  const title = useStore($title)

  const showInput = isAdding && currentId === 0

  return (
    <>
      {showInput ? (
        <Input
          autoFocus
          type="text"
          value={title}
          onChange={events.titleInputChanged}
          onKeyPress={events.titleInputKeyPressed}
        />
      ) : (
        <AddButton onClick={() => events.addButtonClicked()}>
          Add another list
        </AddButton>
      )}
    </>
  )
}
