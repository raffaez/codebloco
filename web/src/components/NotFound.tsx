import React from "react";

interface Props {
  button?: JSX.Element;
}

function NotFound({ button }: Props) {
  return (
    <div className="flex flex-col items-center justify-center mt-20 mx-5">
      <div className="text-2xl whitespace-pre-line text-center font-semibold">
        Parece que esse bloco <span className="md:hidden">{"\n"}</span> não caiu
        na nossa folia... {"\n"}
        Mas não desanime, há outros<span className="md:hidden">
          {"\n"}
        </span>{" "}
        blocos incríveis te esperando!
      </div>
      <div className="flex flex-col justify-center items-center mt-5 space-y-2">
        {button}
      </div>
    </div>
  );
}

export default NotFound;
