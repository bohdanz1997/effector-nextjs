import styled from 'styled-components'
import { Button } from './Button'

type Props = {
  onClick: () => void
}

export const MenuButton = ({ onClick }: Props) => (
  <Container>
    <Button onClick={onClick}>Menu</Button>
  </Container>
)

const Container = styled.div`
  margin-left: auto;
`
