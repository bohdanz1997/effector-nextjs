import React from 'react'
import styled from 'styled-components'

type Props = {
  title: React.ReactNode
}

export const CardView: React.FC<Props> = ({ children, title }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </Container>
  )
}

const Container = styled.div`
  border-radius: var(--border-radius);
  width: 100%;
  background-color: white;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  margin-bottom: var(--p2);
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`

const Title = styled.div`
  padding: var(--p2);
  font-size: var(--font-size4);
`

const Content = styled.div`
  padding: var(--p2);
  font-size: var(--font-size3);
`
