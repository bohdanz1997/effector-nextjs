import { combine, forward, guard, sample, split } from 'effector'
import { createSessionFx } from '../auth'
import { ApiError } from '../request'
import { app } from '../app'
import {
  $apiError,
  emailField,
  formSubmitted,
  passwordField,
  setApiError,
} from './index'

$apiError.on(setApiError, (_, error) => error)

split({
  source: createSessionFx.failData,
  match: {
    unauthorized: (error) => error.statusCode === 401,
  },
  cases: {
    unauthorized: setApiError.prepend((error: ApiError) => error.message),
    __: setApiError.prepend((error: ApiError) => error.message),
  },
})

const logFx = app.createEffect<string, unknown>((message) => {
  console.log(message)
})

forward({
  from: createSessionFx.doneData,
  to: logFx.prepend(() => 'Logged in successfully'),
})

type Form = {
  email: string
  password: string
}

const $form = combine({
  email: emailField.value,
  password: passwordField.value,
})

const validateForm = app.createEvent<Form>()
const resetForm = app.createEvent()

forward({
  from: resetForm,
  to: [emailField.resetValue, passwordField.resetValue],
})

forward({
  from: validateForm,
  to: [emailField.validate, passwordField.validate],
})

$apiError.reset(formSubmitted)

const $isFormValid = combine(
  [emailField.error, passwordField.error],
  (values) => values.every((value) => !value),
)

forward({
  from: formSubmitted,
  to: [
    emailField.setTouched.prepend(() => true),
    passwordField.setTouched.prepend(() => true),
  ],
})

sample({
  source: $form,
  clock: formSubmitted,
  target: validateForm,
})

sample({
  source: $form,
  clock: guard({
    source: formSubmitted,
    filter: $isFormValid,
  }),
  target: createSessionFx,
})
