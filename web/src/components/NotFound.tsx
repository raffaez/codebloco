import React from "react";
import Loading from "./Loading";

interface Props {
  button?: JSX.Element;
}

function NotFound({ button }: Props) {
  return (
    <div className="flex flex-col items-center justify-center mt-20 mx-2">
      <div className="text-7xl font-bold text-purple-500">Ops!</div>
      <div className="text-sm md:text-lg whitespace-pre-line text-center font-semibold my-8">
        Parece que esse bloco não caiu na nossa folia... {"\n"}
        Mas não desanime, há outros blocos incríveis te esperando!
      </div>
      <div className="flex flex-col justify-center items-center space-y-2">
        {button}
      </div>
    </div>
  );
}

export default NotFound;
