import React from 'react'
import styled from 'styled-components'

type Props = {
  title: React.ReactNode
}

export const List: React.FC<Props> = ({ children, title }) => {
  return (
    <Container>
      <Title>{title}</Title>
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

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--p2);
  font-size: var(--font-size4);
  font-weight: bold;
`

const Content = styled.div`
  padding: 0 var(--p2);
  font-size: var(--font-size3);
`
