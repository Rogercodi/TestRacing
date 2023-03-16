import React from "react";

function Divider({ children }) {
  return <p
  className="flex justify-center flex-col border-b-2 border-slate-600 p-6 text-2xl font-bold"
  >{children}</p>;
}

export default Divider;
