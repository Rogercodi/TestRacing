import React from 'react'

function Button({ children, type }) {
  return (
    
   <button
    type={type ? type : 'submit'}
    data-te-ripple-init
    data-te-ripple-color="light"
    className="text-xl flex  mx-auto px-20 py-4 my-8 hover:bg-green-500 hover:text-black rounded bg-slate-500  font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] ">
   {children}
  </button>

  )
}

export default Button