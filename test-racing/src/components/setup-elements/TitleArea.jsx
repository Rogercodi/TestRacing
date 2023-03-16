import React from "react";

function TitleArea({ children }) {
  return (
    <h1 className="text-2xl flex justify-center mb-4 font-bold uppercase">{children}</h1>
  );
}

export default TitleArea;
