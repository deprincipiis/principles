const React = require('react')


const Canvas = ({renderCanvas, ...otherProps}) => {
  const canvasRef = React.useRef()
  const canvasContext = React.useRef()

  React.useEffect(() => {
    if (!canvasContext.current && canvasRef.current) {
      canvasContext.current = canvasRef.current.getContext('2d')
    }
    if (canvasContext.current) {
      renderCanvas(canvasContext.current)
    }
  })

  return <canvas {...otherProps} ref={canvasRef}/>
}


module.exports = Canvas
