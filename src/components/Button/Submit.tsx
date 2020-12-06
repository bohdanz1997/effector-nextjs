import styled from 'styled-components'

export const Button = styled.button`
  -webkit-appearance: none;
  border: none;
  background-color: rgba(0, 0, 0, 0.08);
  font-size: var(--font-size3);
  cursor: pointer;
  padding: var(--p2);
  border-radius: var(--border-radius);

  &:hover {
    background-color: rgba(0, 0, 0, 0.16);
  }
`
