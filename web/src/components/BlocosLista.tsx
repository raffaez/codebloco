import React from "react";

import { useBlocosStore } from "../store";
import BlocoCard from "./BlocoCard";

function BlocosLista() {
  const { blocos, blocosFiltrados } = useBlocosStore();

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blocosFiltrados.length > 0
          ? blocosFiltrados.map((bloco) => (
              <BlocoCard bloco={bloco} key={bloco._id} />
            ))
          : blocos.map((bloco) => <BlocoCard bloco={bloco} key={bloco._id} />)}
      </div>
    </div>
  );
}

export default BlocosLista;
