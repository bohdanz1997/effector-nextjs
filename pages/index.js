import React from 'react'
import styled from 'styled-components'
import { useEvent, useStore } from 'effector-react/ssr'
import * as model from '../model/user'
import { allSettled, fork, serialize } from 'effector/fork'
import { app } from '../model/app'

export const getServerSideProps = async () => {
  const scope = fork(app)
  await allSettled(model.fetchUserFx, { scope })
  await allSettled(model.inc, { scope })

  return {
    props: {
      store: serialize(scope)
    }
  }
}

export default function Dashboard() {
  const userLoading = useStore(model.fetchUserFx.pending)
  const counter = useStore(model.$counter)
  const inc = useEvent(model.inc)
  const dec = useEvent(model.dec)
  const reset = useEvent(model.resetCounter)
  const user = useStore(model.$user)

  return (
    <div>
      <Title>EFFECTOR & STYLED COMPONENTS & NEXT.JS</Title>
      <div>
        counter: {counter}
      </div>
      <button onClick={inc}>Increment</button>
      <button onClick={dec}>Decrement</button>
      <button onClick={reset}>Reset</button>
      {userLoading ? (
        <div>User is loading</div>
      ) : (
        <div>
          user name: {user.name}
          <br/>
          user email: {user.email}
        </div>
      )}
    </div>
  )
}

const Title = styled.h1`
  font-size: 50px;
  color: ${p => p.theme.colors.primary};
`
