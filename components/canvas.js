import React, { useEffect } from 'react'
import { useAnimationFrame } from './hooks'

export default function Canvas ({renderCanvas, ...otherProps}) {
  const canvasRef = React.useRef()
  const canvasContext = React.useRef()

  useAnimationFrame(() => {
    if (canvasContext.current) {
      renderCanvas(canvasContext.current)
    }
  })

  useEffect(() => {
    if (!canvasContext.current && canvasRef.current) {
      canvasContext.current = canvasRef.current.getContext('2d')
    }
  })

  return <canvas {...otherProps} ref={canvasRef}/>
}