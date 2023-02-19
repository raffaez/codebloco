import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import React, { useState } from "react";

import { Bloco } from "../models/Bloco";
import Spinner from "./Spinner";

const containerStyle = {
  with: "100%",
  height: "450px",
};

interface Props {
  blocos: Bloco[];
}

function Map({ blocos }: Props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <Spinner />;

  return <MapContainer blocos={blocos} />;
}

interface MapContainerProps {
  blocos: Bloco[];
}

function MapContainer({ blocos }: MapContainerProps) {
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
      zoom={12}
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
        src={bloco.imagem}
        alt={bloco.nome}
        width={36}
        height={36}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h3 className="font-bold text-base text-red-500">{bloco.nome}</h3>
        <p className="text-sm font-medium">
          {bloco.data} às {bloco.horario}
        </p>
      </div>
    </div>
  );
}

export default Map;
