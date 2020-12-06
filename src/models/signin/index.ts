import { combine, forward, sample } from 'effector'
import { app } from '../app'

type Config = {
  validate: (value: string) => string | null
}

const createField = (name: string, config: Config) => {
  const value = app.createStore<string>('')
  const touched = app.createStore<boolean>(false)
  const error = app.createStore<string | null>(null)

  const setValue = app.createEvent<string>()
  const setTouched = app.createEvent<boolean>()
  const setError = app.createEvent<string | null>()
  const resetError = app.createEvent()
  const resetValue = app.createEvent()
  const validate = app.createEvent<Record<string, string>>()

  value.on(setValue, (_, value) => value).reset(resetValue)
  touched.on(setTouched, (_, touched) => touched)
  error
    .on(setError, (_, error) => error)
    .on(value, (_, value) => config.validate(value))
    .on(validate, (_, form) => config.validate(form[name]))
    .reset(resetError)

  const data = combine({
    value,
    touched,
    error,
  })
  const handlers = {
    setValue,
    setTouched,
  }

  return {
    value,
    touched,
    error,
    setValue,
    setTouched,
    setError,
    resetValue,
    resetError,
    validate,
    data,
    handlers,
  }
}

export const emailField = createField('email', {
  validate(email: string) {
    if (email.length === 0) {
      return 'Required'
    }
    if (!email.includes('@')) {
      return 'Invalid email'
    }
    return null
  },
})

export const passwordField = createField('password', {
  validate(password: string) {
    if (password.length === 0) {
      return 'Required'
    }
    if (password.length < 4) {
      return 'Minimum length 4'
    }
    return null
  },
})

export const createForm = (fields) => {
  const mapProps = (fn: (value: any) => any) => {
    const props = {}
    for (const name in fields) {
      props[name] = fn(fields[name])
    }
    return props
  }

  const valueFields = mapProps((field) => field.value)
  const errorFields = Object.values(mapProps((field) => field.error))
  const resetValueFields = Object.values(mapProps((field) => field.resetValue))
  const validateFields = Object.values(mapProps((field) => field.validate))

  const values = combine(valueFields)
  const validate = app.createEvent()
  const reset = app.createEvent()
  const submitted = app.createEvent()

  forward({
    from: reset,
    to: resetValueFields,
  })

  forward({
    from: validate,
    to: validateFields,
  })

  const isValid = combine(errorFields, (values) =>
    values.every((value) => !value),
  )

  sample({
    source: values,
    clock: submitted,
    target: validate,
  })

  return {
    submitted,
    values,
    validate,
    isValid,
  }
}

export const form = createForm({
  email: emailField,
  password: passwordField,
})

export const formSubmitted = app.createEvent()

export const setApiError = app.createEvent<string>()

export const $apiError = app.createStore<string | null>(null)
