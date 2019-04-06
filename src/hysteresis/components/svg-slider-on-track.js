import React from 'react'

import { translate } from '../../../components/utils'

import SliderOnTrack from './slider-on-track'


export default function SvgSliderOnTrack (props) {
  const { trackLength, padding } = props;

  const width = trackLength + 2 * padding
  const height = 2 * padding

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`}>
      <g transform={translate(padding, padding)}>
        <SliderOnTrack {...props} />
      </g>
    </svg>
  )
}