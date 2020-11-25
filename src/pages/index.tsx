import React from 'react'
import { GetServerSideProps } from 'next'
import { fork, serialize } from 'effector/fork'
import { app } from 'models/app'
import { Board } from '../components/Board'

export const getServerSideProps: GetServerSideProps = async () => {
  const scope = fork(app)
  // await allSettled(model.fetchUserFx, { scope })

  return {
    props: {
      store: serialize(scope),
    },
  }
}

export default function Dashboard() {
  return (
    <div>
      <Board />
    </div>
  )
}
