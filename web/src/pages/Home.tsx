import React from "react";
import Hero from "../components/Hero";
import BlocosLista from "../components/BlocosLista";

function Home() {
  return (
    <div className="w-screen h-screen bg-gray-50">
      <Hero />
      <BlocosLista />
    </div>
  );
}

export default Home;
