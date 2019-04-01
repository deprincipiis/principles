import React, { useEffect, useState, useRef } from 'react'
import _ from 'lodash'
import Canvas from './canvas'
import color from 'color'
import {useVisibilitySensor, useTimeout} from 'rooks'
import {useInterval} from './hooks'
import DfaModel from './dfa-model'


// This is the view for the diffusion-limited aggregation model used in "Emergence".

export default function Dfa ({
  // SIMULATION
  seed,
  numParticles,
  gridWidth,
  gridHeight,
  // INITIALIZATION
  preFreeze,  // start with all particles frozen
  preSeed,  // start with a seed in the center
  // DISPLAY
  cellSize,
  // ANIMATION
  frameMs,
  stepsPerFrame,
  // BEHAVIOR
  resetOnFrozen,  // automatically reset the simulation when all particles freeze
  dropSeedTime,  // reset to drop a seed
}) {

  const rootNode = useRef(null);
  let [model, setModel] = useState()
  let [hasRendered, setHasRendered] = useState()
  const {isVisible} = useVisibilitySensor(rootNode, {scrollDebounce: 20})

  const initialize = () => {
    let model = new DfaModel({seed, numParticles, gridWidth, gridHeight});
    if (preFreeze) { model.freezeAll() }
    if (preSeed) { model.dropSeed() }
    setModel(model)
  }

  useEffect(initialize, [])

  useEffect(() => {
    if (dropSeedTime) {
      model.dropSeed()
      setModel(model)
    }
  }, [dropSeedTime])

  const {start: startResetTimeout, clear: clearResetTimeout} = useTimeout(() => {
    initialize()
    clearResetTimeout()
  }, 1000)

  useInterval(() => {
    if (!model || !isVisible) { return }
    _.range(stepsPerFrame).forEach(() => model.step())
    if (resetOnFrozen && model.allFrozen()) {
      startResetTimeout()
    }
    setModel(model)
  }, frameMs, true)

  const renderCanvas = (context) => {
    if (!model) { return }
    if (!isVisible && hasRendered) { return }
    setHasRendered(true)

    context.clearRect(0,0, cellSize * gridWidth, cellSize * gridHeight)

    const nowMs = +new Date()

    model.particles.forEach((particle) => {
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

  return (
    <div ref={rootNode}>
      <Canvas width={cellSize * gridWidth} height={cellSize * gridHeight}
              style={{ display: 'block', margin: '20px auto', background: 'white',
                        filter: isVisible ? '' : 'blur(4px)'}}
              renderCanvas={renderCanvas} />
    </div>
  )
}
