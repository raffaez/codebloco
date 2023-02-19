import React from "react";
import { Bloco } from "../models/Bloco";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/20/solid";

type Props = {
  bloco: Bloco;
};

function BlocoCard({ bloco }: Props) {
  return (
    <div className="w-96 h-80 rounded-lg flex flex-col border border-gray-200">
      <img
        src={bloco.imagem}
        className="h-40 object-cover object-center rounded-t-lg"
        alt=""
      />
      <div className="px-5 h-full flex flex-col justify-center space-y-2">
        <h3 className="text-lg font-bold text-black-500">{bloco.nome}</h3>
        <p className="text-md text-black-500/75">{bloco.descricao}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-row space-x-1.5">
            <MapPinIcon className="h-5 w-5 text-red-500" />
            <span className="text-base text-black-500/75">
              {bloco.cidade} - {bloco.estado}
            </span>
          </div>
          <div className="flex flex-row space-x-1.5">
            <CalendarIcon className="h-5 w-5 text-red-500" />
            <span className="text-base text-black-500/75">
              {bloco.data} às {bloco.horario}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlocoCard;
