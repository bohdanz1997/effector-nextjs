import React from 'react'
import styled from 'styled-components'
import { useEvent, useStore } from 'effector-react'

import {
  listClicked,
  listHovered,
  listLeft,
  $currentId,
  $hoveredId,
  $isEditing,
} from 'models/list'
import { List, removeListFx } from 'models/lists'

import { DeleteButton } from '../Button'
import { EditableTitle } from './EditableTitle'

type Props = {
  list: List
}

export const ListView: React.FC<Props> = ({ children, list }) => {
  const hoveredId = useStore($hoveredId)
  const isEditing = useStore($isEditing)
  const currentId = useStore($currentId)
  const events = useEvent({
    listHovered,
    listLeft,
    listClicked,
    removeListFx,
  })

  const showActions = hoveredId === list.id
  const showEditableField = isEditing && currentId === list.id

  return (
    <Container
      onMouseEnter={() => events.listHovered(list.id)}
      onMouseLeave={() => events.listLeft(list.id)}
    >
      <Title>
        {showEditableField ? (
          <EditableTitle />
        ) : (
          <TitleText onClick={() => events.listClicked(list.id)}>
            {list.title}
          </TitleText>
        )}
      </Title>
      {showActions && (
        <Actions>
          <DeleteButton onClick={() => events.removeListFx(list.id)}>
            Delete
          </DeleteButton>
        </Actions>
      )}
      <Content>{children}</Content>
    </Container>
  )
}

export const ListWrapper = styled.div`
  margin: 0 var(--p1);
  min-width: var(--col-width);
`

const Container = styled(ListWrapper)`
  position: relative;
  border-radius: var(--border-radius);
  background-color: #ebecf0;
  height: 100%;
`

const Content = styled.div`
  padding: 0 var(--p2);
  font-size: var(--font-size3);
`

const Actions = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: var(--p1) var(--p2);
`

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--p2);
  font-size: var(--font-size4);
  font-weight: bold;
  cursor: pointer;
  max-width: 75%;
`

export const TitleText = styled.div`
  width: 100%;
`
