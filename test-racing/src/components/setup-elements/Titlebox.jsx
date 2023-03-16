import React from 'react'

function Titlebox({ children, className }) {
  return (
    <h1 className={className ? className : "text-4xl uppercase flex justify-center font-extrabold p-6"}>
          {children}
        </h1>
  )
}

export default Titlebox