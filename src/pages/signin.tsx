import styled from 'styled-components'
import { useEvent, useStore } from 'effector-react'
import { GetServerSideProps } from 'next'

import { allSettled, fork, serialize } from 'effector/fork'
import {
  $apiError,
  emailField,
  formSubmitted,
  passwordField,
} from '../models/signin'
import { getSessionFx } from '../models/auth'
import { app, serverStarted } from '../models/app'
import { FormGroup, FormInput } from '../components/Form'
import { Button, ButtonGroup } from '../components/Button'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const scope = fork(app)
  await allSettled(serverStarted, {
    scope,
    params: { req, res },
  })

  return {
    props: {
      store: serialize(scope),
    },
  }
}

export default function Signin() {
  const apiError = useStore($apiError)
  const events = useEvent({
    formSubmitted,
    getSessionFx,
  })

  return (
    <Container>
      {apiError && <ErrorBox>{apiError}</ErrorBox>}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          events.formSubmitted()
        }}
      >
        <Email />
        <Password />
        <FormGroup>
          <ButtonGroup>
            <Button type="submit">Sign in</Button>
            <Button type="reset">Reset</Button>
            <Button onClick={() => events.getSessionFx()}>Get session</Button>
          </ButtonGroup>
        </FormGroup>
      </form>
    </Container>
  )
}

const Email = () => {
  const { value, error, touched } = useStore(emailField.data)
  const events = useEvent(emailField.handlers)

  return (
    <FormGroup>
      <FormInput
        label="Email"
        autoComplete="email"
        name="email"
        type="text"
        value={value}
        error={touched && error}
        onChange={events.setValue}
        onBlur={() => events.setTouched(true)}
      />
    </FormGroup>
  )
}

const Password = () => {
  const { value, error, touched } = useStore(passwordField.data)
  const events = useEvent(passwordField.handlers)

  return (
    <FormGroup>
      <FormInput
        label="Password"
        autoComplete="password"
        name="password"
        type="password"
        value={value}
        error={touched && error}
        onChange={events.setValue}
        onBlur={() => events.setTouched(true)}
      />
    </FormGroup>
  )
}

const ErrorBox = styled.div`
  padding: var(--p2) 0;
  color: var(--danger);
`

const Container = styled.div`
  max-width: 400px;
  display: flex;
  margin: 100px auto 0;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  border-radius: var(--border-radius);
  padding: var(--p4);
`
