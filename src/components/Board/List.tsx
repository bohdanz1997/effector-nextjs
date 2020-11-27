import React from 'react'
import styled from 'styled-components'

type Props = {
  title: React.ReactNode
}

export const List: React.FC<Props> = ({ children, title }) => {
  return (
    <Container>
      {title}
      <Content>{children}</Content>
    </Container>
  )
}

export const ListWrapper = styled.div`
  margin: 0 var(--p1);
  min-width: var(--col-width);
`

const Container = styled(ListWrapper)`
  border-radius: var(--border-radius);
  background-color: #ebecf0;
  height: 100%;
`

const Content = styled.div`
  padding: 0 var(--p2);
  font-size: var(--font-size3);
`
