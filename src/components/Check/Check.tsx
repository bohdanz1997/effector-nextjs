import * as React from 'react'
import styled from 'styled-components'

type Props = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export const Check = ({ label, checked, onChange }: Props) => {
  return (
    <Label>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <Text>{label}</Text>
    </Label>
  )
}

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const Text = styled.span`
  margin-left: var(--p2);
`
