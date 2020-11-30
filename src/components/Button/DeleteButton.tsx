import styled from 'styled-components'

export const DeleteButton = styled.button`
  -webkit-appearance: none;
  border: none;
  background-color: transparent;
  font-size: var(--font-size2);
  cursor: pointer;
  padding: var(--p2);
  border-radius: var(--border-radius);

  &:hover {
    background-color: var(--dark1);
  }
`
