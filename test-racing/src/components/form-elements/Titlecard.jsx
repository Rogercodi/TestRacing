import React from 'react'

function Titlecard(props) {
  return (
    <div 
    className={props.className ? props.className : 'flex border-b-2 border-b-slate-600 uppercase'}>
        <h1
        className="text-5xl p-8 my-0 mx-auto ">
        {props.children}
        </h1>
        </div>
  )
}

export default Titlecard