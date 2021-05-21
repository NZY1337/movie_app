import React from 'react'
import { animated, useSpring } from 'react-spring'

export default function ({ movieSrc, setShowImg }) {
  const secondStyle = {
    objectFit: 'cover',
    width: '100%',
    height: '250px',
  }

  const fullImgVisible = useSpring({
    opacity: setShowImg ? 1 : 0,
    transform: setShowImg ? `translateX(0)` : `translateX(-10%)`,
  })

  return (
    <animated.img
      style={{ ...secondStyle, ...fullImgVisible }}
      src={movieSrc}
      alt=""
    ></animated.img>
  )
}
