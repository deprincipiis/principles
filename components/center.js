import React from 'react'

export default function Center ({children}) {
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      {children}
    </div>
  )
}