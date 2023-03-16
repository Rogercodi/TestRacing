import React from "react";

function Input(props) {
  return (
    <div className="flex flex-row justify-between border-b-2 border-slate-600 p-2">
      <label className="font-bold p-3 key" htmlFor="circuito">
        {props.label}
      </label>
      <input
        value={props.value}
        className="p-4 align-bottom w-1/3 text-xl bg-slate-300 rounded-md "
        onChange={(e) => {
          e.preventDefault(), props.onChange(e.target.value);
        }}
        type={props.type ? props.type : "text"}
        name={props.name}
        placeholder={props.name}
        readOnly={props.readOnly}
      />
    </div>
  );
}

export default Input;
