import React from 'react'

function InputSetup(props) {
  return (
    <div className="flex ">
      <label className="text-lg px-8" >
        {props.label}
      </label>
      <input
        value={props.value}
        className={props.className ? props.className : " m-1 text-lg bg-slate-300 text-center rounded-lg ml-auto"}
        onChange={(e) => {
          e.preventDefault(), props.onChange(e.target.value);
        }}
        type={props.type ? props.type : "text"}
        name={props.name}
        placeholder={props.name}
        readOnly={props.readOnly}
      />
    </div>
  )
}

export default InputSetup