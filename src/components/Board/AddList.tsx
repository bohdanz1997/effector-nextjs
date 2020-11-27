import * as React from 'react'
import { useStore } from 'effector-react'
import {
  $isEditing,
  $title,
  buttonClicked,
  titleInputChanged,
  titleInputKeyPressed,
} from 'models/list/add'

import { AddButton } from '../Button/AddButton'
import { Input } from '../Input'

export const AddList = () => {
  const isEditing = useStore($isEditing)
  const title = useStore($title)

  return (
    <>
      {isEditing ? (
        <Input
          autoFocus
          type="text"
          value={title}
          onChange={titleInputChanged}
          onKeyPress={titleInputKeyPressed}
        />
      ) : (
        <AddButton onClick={() => buttonClicked()}>Add another list</AddButton>
      )}
    </>
  )
}
