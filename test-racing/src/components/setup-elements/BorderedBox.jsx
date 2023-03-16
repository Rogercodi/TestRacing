import React from 'react'

function BorderedBox({className, children}) {
  return (
    <div className={
       className ? className : " border-2 border-gray-600 w-11/12 mx-auto mt-8 rounded-3xl pb-4"}
        >
    {children}
    </div>
  )
}

export default BorderedBox