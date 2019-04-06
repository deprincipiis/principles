import React from 'react'

export default function Lorem ({children, height="100%"}) {
  return (
    <div style={{width: "100%", paddingBottom: height, border: "2px solid black", position: "relative"}}>
      <div style={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {children}
      </div>
    </div>
  )
}