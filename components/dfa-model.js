import _ from 'lodash'
import seedrandom from 'seedrandom'
import { mod } from './utils'


// This is the model for the diffusion-limited aggregation model used in "Emergence".

export default class DfaModel {
  constructor(options) {
    Object.assign(this, options)

    const rand = seedrandom(this.seed)
    this.particles = _.range(this.numParticles).map(() => ({
      position: [
        Math.floor(rand() * this.gridWidth),
        Math.floor(rand() * this.gridHeight)
      ]
    }))

    this.cellIsFrozen = _.range(this.gridWidth).map(() => [])
  }

  freeze(particle) {
    particle.isFrozen = true
    particle.freezeMs = +new Date()
    this.cellIsFrozen[particle.position[0]][particle.position[1]] = true
  }

  freezeAll() {
    this.particles.forEach((particle) => this.freeze(particle))
  }

  dropSeed(x, y) {
    if (x === undefined) { x = Math.floor(this.gridWidth / 2) }
    if (y === undefined) { y = Math.floor(this.gridHeight / 2) }

    let particle = { position: [x, y] }
    this.particles.push(particle)
    this.freeze(particle)
  }

  allFrozen() {
    return _.every(this.particles, (particle) => particle.isFrozen)
  }

  step() {
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0], [-1, -1], [1, 1], [-1, 1], [1, -1]]
    const numDirections = directions.length

    // motion phase
    this.particles.forEach((particle) => {
      if (particle.isFrozen) { return }
      const direction = directions[Math.floor(numDirections * Math.random())]
      let dx = direction[0], dy = direction[1]
      const lastDirection = particle.lastDirection
      if (lastDirection && lastDirection[0] === -dx && lastDirection[1] === -dy) {
        dx = -dx
        dy = -dy
      }
      particle.position[0] = mod(particle.position[0] + dx, this.gridWidth)
      particle.position[1] = mod(particle.position[1] + dy, this.gridHeight)
      particle.lastDirection = [dx, dy]
    })

    // freezing phase
    this.particles.forEach((particle) => {
      if (particle.isFrozen) { return }
      for (let i = 0; i < numDirections; i++) {
        const direction = directions[i]
        const col = this.cellIsFrozen[particle.position[0] + direction[0]]
        if (col && col[particle.position[1] + direction[1]]) {
          this.freeze(particle)
          return
        }
      }
    })
  }
}
