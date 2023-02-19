import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import React from "react";
import { Bloco } from "../models/Bloco";

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

  if (!isLoaded) return <div>Loading...</div>;

  return <MapContainer blocos={blocos} />;
}

interface MapContainerProps {
  blocos: Bloco[];
}

function MapContainer({ blocos }: MapContainerProps) {
  const center = blocos[0].position;
  return (
    <GoogleMap zoom={12} center={center} mapContainerClassName="w-full h-96">
      {blocos.map((bloco) => (
        <MarkerF
          key={bloco.id}
          position={{ lat: bloco.position.lat, lng: bloco.position.lng }}
        />
      ))}
    </GoogleMap>
  );
}

export default Map;
