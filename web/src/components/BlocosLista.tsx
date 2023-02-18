import React from "react";
import { blocos } from "./blocosContent";
import BlocoCard from "./BlocoCard";

function BlocosLista() {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blocos.map((bloco) => (
          <BlocoCard bloco={bloco} key={bloco.id} />
        ))}
      </div>
    </div>
  );
}

export default BlocosLista;
