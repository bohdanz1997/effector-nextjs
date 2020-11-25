import styled from 'styled-components'

export const AddButton = styled.button`
  -webkit-appearance: none;
  border: none;
  background-color: rgba(0, 0, 0, 0.08);
  text-decoration: underline;
  font-size: var(--font-size3);
  cursor: pointer;
  padding: var(--p2);
  border-radius: var(--border-radius);
  width: 100%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.16);
  }
`
