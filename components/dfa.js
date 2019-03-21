const React = require('react')
const _ = require('lodash')
const seedrandom = require('seedrandom')
const Canvas = require('./canvas')
const color = require('color')
const VisibilitySensor = require('react-visibility-sensor').default;

function mod(a, b) {
  return ((a % b) + b) % b
}

class Dfa extends React.Component {
  state = {}

  initialize = (freeze) => {
    const { seed, numParticles, gridWidth, gridHeight, preFreeze } = this.props

    const rand = seedrandom(seed)
    const particles = _.range(numParticles).map(() => ({
      position: [
        Math.floor(rand() * gridWidth),
        Math.floor(rand() * gridHeight)
      ],
      isFrozen: preFreeze,
    }))

    // console.log(particles)

    const cellIsFrozen = _.range(gridWidth).map(() => [])
    if (freeze) {
      const x = Math.floor(gridWidth / 2), y = Math.floor(gridHeight / 2)
      particles.push({
        position: [x, y],
        isFrozen: true
      })
      cellIsFrozen[x][y] = true
    }

    this.setState({ particles, cellIsFrozen })
  }

  go = () => {
    const { gridWidth, gridHeight } = this.props
    const { particles, cellIsFrozen } = this.state

    const x = Math.floor(gridWidth / 2), y = Math.floor(gridHeight / 2)
    particles.push({
      position: [x, y],
      isFrozen: true
    })
    cellIsFrozen[x][y] = true

    this.setState({ particles, cellIsFrozen })
  }

  componentDidMount() {
    this.initialize(this.props.preSeed)
    this.interval = setInterval(this.onInterval, this.props.frameMs)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { cellSize, gridWidth, gridHeight, clickToFreeze } = this.props
    const { isVisible } = this.state

    return (
      <VisibilitySensor onChange={this.onVisibilityChange}>
        <Canvas width={cellSize * gridWidth} height={cellSize * gridHeight}
                style={{ display: 'block', margin: '20px auto', background: 'white',
                         filter: isVisible ? '' : 'brightness(75%)'}} 
                renderCanvas={this.renderCanvas}
                onClick={clickToFreeze ? () => this.initialize(true) : undefined}/>
      </VisibilitySensor>
    )
  }

  onVisibilityChange = (isVisible) => {
    this.setState({ isVisible })
  }

  renderCanvas = (context) => {
    const { cellSize, gridWidth, gridHeight } = this.props;
    const { particles } = this.state;

    if (!particles) { return }

    context.clearRect(0,0, cellSize * gridWidth, cellSize * gridHeight)

    const nowMs = +new Date()

    particles.forEach((particle) => {
      context.beginPath();
      context.arc(cellSize * (particle.position[0] + 0.5), cellSize * (particle.position[1] + 0.5),
                  cellSize / 2, 0, 2 * Math.PI, false);
      context.fillStyle = particle.isFrozen ? color('green').string() : 'black';
      context.fill();


      const animTime = 500, animSize = cellSize * 1
      if (particle.freezeMs && nowMs - particle.freezeMs < animTime) {
        context.beginPath();
        context.arc(cellSize * (particle.position[0] + 0.5), cellSize * (particle.position[1] + 0.5),
          animSize * (1 - (nowMs - particle.freezeMs) / animTime), 0, 2 * Math.PI, false);
        context.strokeStyle = color('green').alpha(0.5).string();
        context.stroke();
      }
    })
  }

  onInterval = () => {
    const { gridWidth, gridHeight, stepsPerFrame, resetOnFrozen } = this.props
    let { particles, cellIsFrozen, isVisible } = this.state

    if (!particles || !isVisible) { return }

    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0], [-1, -1], [1, 1], [-1, 1], [1, -1]]
    const numDirections = directions.length

    _.range(stepsPerFrame).forEach(() => {
      // motion phase
      particles.forEach((particle) => {
        if (particle.isFrozen) { return }
        const direction = directions[Math.floor(numDirections * Math.random())]
        let dx = direction[0], dy = direction[1]
        const lastDirection = particle.lastDirection
        if (lastDirection && lastDirection[0] === -dx && lastDirection[1] === -dy) {
          dx = -dx
          dy = -dy
        }
        particle.position[0] = mod(particle.position[0] + dx, gridWidth)
        particle.position[1] = mod(particle.position[1] + dy, gridHeight)
        particle.lastDirection = [dx, dy]
      })

      // freezing phase
      particles.forEach((particle) => {
        if (particle.isFrozen) { return }
        let shouldFreeze = false
        for (let i = 0; i < numDirections; i++) {
          const direction = directions[i]
          const col = cellIsFrozen[particle.position[0] + direction[0]]
          if (col && col[particle.position[1] + direction[1]]) {
            shouldFreeze = true
            break
          }
        }
        if (shouldFreeze) {
          cellIsFrozen[particle.position[0]][particle.position[1]] = true
          particle.isFrozen = true
          particle.freezeMs = +new Date()
        }
      })
    })

    if (resetOnFrozen && !this.resetQueued && _.every(particles, (particle) => particle.isFrozen)) {
      setTimeout(() => {this.resetQueued = false; this.initialize(true)}, 1000)
      this.resetQueued = true
    }

    this.setState({particles, cellIsFrozen})
  }
}

module.exports = Dfa;
