import { useEffect } from 'react'
import styled from 'styled-components'
import { useEvent, useStore } from 'effector-react'
import { $targetPosition, setPointerPosition } from '../../models/dragdrop'
import { MockCardView } from '../Card/CardView'
import { $targetCard } from '../../models/board'

const useMousePosition = () => {
  const events = useEvent({
    setPointerPosition,
  })

  useEffect(() => {
    const fn = (event: MouseEvent) => {
      events.setPointerPosition({
        x: event.clientX,
        y: event.clientY,
      })
    }
    document.addEventListener('mousemove', fn)
    return () => {
      document.removeEventListener('mousemove', fn)
    }
  }, [events])
}

export const DraggableTarget = () => {
  const targetCard = useStore($targetCard)
  const { x, y } = useStore($targetPosition)
  useMousePosition()

  return targetCard ? (
    <Container x={x} y={y}>
      <MockCardView title={targetCard?.title} />
    </Container>
  ) : null
}

type Position = {
  x: number
  y: number
}

const Container = styled.div.attrs<Position>(({ x, y }) => ({
  style: {
    top: `${y}px`,
    left: `${x}px`,
  },
}))`
  position: absolute;
  width: 264px;
  height: 55px;
  opacity: 0.8;
`
