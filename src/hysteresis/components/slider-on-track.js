import React from 'react'

import Slider from './slider'


export default function SliderOnTrack (props) {
  const { trackLength } = props;

  return <g>
    <line x1={0} y1={0} x2={trackLength} y2={0} stroke="gray" strokeDasharray="5, 5"/>
    <Slider {...props}/>
  </g>;
}