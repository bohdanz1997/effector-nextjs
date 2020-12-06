import React from 'react'
import { InputLabel } from '../Label/InputLabel'
import { Input } from '../Input'
import { ErrorLabel } from '../Label/ErrorLabel'

type Props = {
  label?: React.ReactNode
  value: string
  error?: string | boolean | null
  name: string
  type?: string
  autoComplete?: string
  onChange: (value: string) => void
  onBlur?: () => void
}

export const FormInput = ({
  label,
  error,
  value,
  name,
  type,
  autoComplete,
  onChange,
  onBlur,
}: Props) => (
  <>
    {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
    <Input
      id={name}
      name={name}
      value={value}
      type={type}
      autoComplete={autoComplete}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
    />
    {error && <ErrorLabel>{error}</ErrorLabel>}
  </>
)
