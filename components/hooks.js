import { useRef, useLayoutEffect } from 'react'


export function useInterval (callback, delay) {
  const callbackRef = useRef(callback)

  useLayoutEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useLayoutEffect(() => {
    function tick() {
      callbackRef.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export function useAnimationFrame (callback) {
  const callbackRef = useRef(callback)
  const frameRef = useRef()

  useLayoutEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useLayoutEffect(() => {
    function loop() {
      frameRef.current = requestAnimationFrame(loop)
      callbackRef.current()
    }
    frameRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])
}