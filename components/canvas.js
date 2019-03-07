const React = require('react')


class Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
  }

  render() {
    const { renderCanvas, ...otherProps } = this.props

    return <canvas {...otherProps} ref={this.canvasRef}/>
  }

  componentDidMount() {
    this.updateCanvas()
  }

  componentDidUpdate() {
    this.updateCanvas()
  }

  updateCanvas() {
    if (!this.canvasContext && this.canvasRef.current) {
      this.canvasContext = this.canvasRef.current.getContext('2d')
    }
    if (this.canvasContext) {
      this.props.renderCanvas(this.canvasContext)
    }
  }
}

module.exports = Canvas
