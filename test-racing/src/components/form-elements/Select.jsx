import React from "react";

function Select(props) {
  return (
    <div className="flex flex-row border-b-2 border-slate-600 p-2  ">
      <label className="font-bold p-4 key">{props.children}</label>
      <select
        className="p-4  align-bottom ml-auto w-1/3  text-xl bg-slate-300 rounded-md"
        value={props.value}
        onChange={(e) => {
          e.preventDefault(), props.onChange(e.target.value);
        }}
      >
        {props.options.map((item) => {
          return <option>{item[props.optionName]}</option>;
        })}
      </select>
    </div>
  );
}

export default Select;
