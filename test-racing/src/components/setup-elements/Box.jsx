import React from 'react'

function Box({className ,children, header}) {
  return (
    <div 
    className={className ? className : 'flex flex-col p-4 '}>
      {children}
      </div>
  )
}

export default Box