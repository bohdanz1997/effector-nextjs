import * as React from 'react'
import styled from 'styled-components'
import { useEvent, useList, useStore } from 'effector-react'
import {
  $isOpen,
  $labelsOptions,
  labelClicked,
  menuClicked,
} from 'models/board/menu'

import { MenuButton } from '../Button'
import { Check } from '../Check/Check'
import { ListGroup, ListGroupItem } from '../ListGroup'
import { FilterItem, FilterTitle } from '../FilterGroup'

export const ContextMenu = () => {
  const events = useEvent({
    menuClicked,
  })
  const isOpen = useStore($isOpen)

  return (
    <Container>
      <MenuButton onClick={events.menuClicked} />
      {isOpen && <Menu />}
    </Container>
  )
}

const Menu = () => {
  return (
    <MenuWrapper>
      <ListGroup>
        <ListGroupItem>Filter Cards</ListGroupItem>
        <ListGroupItem>
          <FilterTitle>Labels</FilterTitle>
          <LabelsOptions />
        </ListGroupItem>
        <ListGroupItem />
      </ListGroup>
    </MenuWrapper>
  )
}

const LabelsOptions = () => {
  const events = useEvent({ labelClicked })

  return useList($labelsOptions, ({ id, checked }) => (
    <FilterItem key={id}>
      <Check
        label={id}
        checked={checked}
        onChange={(checked) => events.labelClicked({ id, checked })}
      />
    </FilterItem>
  ))
}

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: var(--p2);
`

const MenuWrapper = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  margin-top: var(--p1);
  min-width: 250px;
`
