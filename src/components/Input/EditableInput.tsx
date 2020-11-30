import React from 'react'
import { Input } from './Input'

type Props = {
  value: string
  onChange: (value: string) => void
  onKeyPress: (key: string) => void
}

export const EditableInput: React.FC<Props> = ({
  value,
  onChange,
  onKeyPress,
}) => (
  <Input
    autoFocus
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onKeyPress={(e) => onKeyPress(e.key)}
  />
)
