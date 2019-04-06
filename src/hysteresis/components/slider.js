import React, {useState, useRef, useEffect} from 'react'
import d3 from 'd3'

import {translate} from '../../../components/utils'


export default function Slider ({outputPos, inputPos, draggable, onDrag, onDragEnd}) {
  const [isDragging, setIsDragging] = useState(false)
  const inputPinRef = useRef()

  // useEffect(() => {
  //   if (draggable) {
  //     const dragBehavior = d3.behavior.drag()
  //       .on('dragstart', () => {
  //         setIsDragging(true)
  //       })
  //       .on('drag', () => {
  //         onDrag && onDrag()
  //       })
  //       .on('dragend', () => {
  //         setIsDragging(false)
  //         onDragEnd && onDragEnd()
  //       });
  
  //     d3.select(inputPinRef.current).call(dragBehavior);
  //   }
  // }, [])

  var sliderLength = 70;
  var gap = outputPos - inputPos;
  var connectorPath =
    'M0,0 A' + (gap / 2) + ',' + (sliderLength - Math.abs(gap))/2 +
    ' 0 0,' + (gap < 0 ? 1 : 0) + '  ' + (outputPos - inputPos) + ',0';

  return (
    <g transform={translate(inputPos, 0)}>
      <path d={connectorPath} style={{
        stroke: 'black',
        strokeWidth: 3,
        fill: 'none',
      }} />
      <circle ref={inputPinRef} r={8} style={{
        stroke: 'black',
        strokeWidth: 3,
        fill: 'lightblue',
        cursor: draggable && (isDragging ? '-webkit-grabbing' : '-webkit-grab'),
      }} />
      <circle r={5} transform={translate(gap, 0)} style={{
        stroke: 'black',
        strokeWidth: 3,
        fill: 'pink',
      }} />
    </g>
  )
  return <g></g>;
}
