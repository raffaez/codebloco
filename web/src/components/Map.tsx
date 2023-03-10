import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import React, { useState } from "react";

import { urlFor } from "../lib/sanity";
import { Bloco } from "../models/Bloco";
import { useBlocosStore } from "../store";
import Spinner from "./Spinner";

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  const { blocos, blocosFiltrados } = useBlocosStore();

  if (!isLoaded) return <Spinner />;

  const blocosMap = blocosFiltrados.length > 0 ? blocosFiltrados : blocos;

  return <MapContainer blocos={blocosMap} />;
}

interface MapContainerProps {
  blocos: Bloco[];
}

function MapContainer({ blocos }: MapContainerProps) {
  const cidadesSet = new Set(blocos.map((bloco) => bloco.cidade));

  const zoom = cidadesSet.size > 1 ? 4 : 12;
  const center = blocos[0].position;

  const [ativo, setAtivo] = useState<Bloco | null>(null);

  const handleMarkerClick = (bloco: Bloco) => {
    setAtivo(bloco);
  };

  const handleClose = () => {
    setAtivo(null);
  };

  return (
    <GoogleMap
      zoom={zoom}
      center={center}
      mapContainerClassName="w-full h-[420px]"
    >
      {blocos.map((bloco) => (
        <MarkerF
          key={bloco._id}
          position={{ lat: bloco.position.lat, lng: bloco.position.lng }}
          onClick={() => handleMarkerClick(bloco)}
        ></MarkerF>
      ))}
      {ativo && (
        <InfoWindowF
          position={{ lat: ativo.position.lat, lng: ativo.position.lng }}
          onCloseClick={handleClose}
        >
          <MarkerInfoWindow bloco={ativo} />
        </InfoWindowF>
      )}
    </GoogleMap>
  );
}

interface MarkerInfoWindowProps {
  bloco: Bloco;
}

function MarkerInfoWindow({ bloco }: MarkerInfoWindowProps) {
  return (
    <div className="flex flex-row items-center space-x-2 p-1">
      <img
        src={urlFor(bloco.imagem).url()}
        alt={bloco.nome}
        width={36}
        height={36}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h3 className="font-bold text-base text-red-500">{bloco.nome}</h3>
        <p className="text-sm font-medium">
          {bloco.data} ??s {bloco.horario}
        </p>
      </div>
    </div>
  );
}

export default Map;
