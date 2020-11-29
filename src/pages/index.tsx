import React from 'react'
import { GetServerSideProps } from 'next'
import { allSettled, fork, serialize } from 'effector/fork'
import { app } from 'models/app'
import { Board } from 'components/Board/Board'
import { initializeBoard } from '../models/board'

export const getServerSideProps: GetServerSideProps = async () => {
  const scope = fork(app)
  await allSettled(initializeBoard, { scope })

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
