import React from "react";
import BlocoCard from "./BlocoCard";
import { Bloco } from "../models/Bloco";

interface Props {
  blocos: Bloco[];
}

function BlocosLista({ blocos }: Props) {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blocos.map((bloco) => (
          <BlocoCard bloco={bloco} key={bloco._id} />
        ))}
      </div>
    </div>
  );
}

export default BlocosLista;
