import React from "react";
import Spinner from "./Spinner";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center mt-20 mx-5">
      <div className="text-3xl font-semibold text-black-500">
        Preparando os confetes e serpentinas...
      </div>
      <Spinner />
    </div>
  );
}

export default Loading;
