import "./global.css";

import { useEffect } from "react";

import Hero from "./components/Hero";
import Conteudo from "./pages/Conteudo";
import { useBlocosStore } from "./store";

function App() {
  const { fetchBlocos } = useBlocosStore();

  useEffect(() => {
    fetchBlocos();
  }, []);

  return (
    <div className="max-w-screen overflow-x-hidden scroll-smooth text-black-500">
      <div className="w-screen h-screen flex flex-col scroll-smooth scrollbar-thin scrollbar-track-black-500/20 scrollbar-thumb-red-500">
        <section id="hero" className="relative z-20">
          <Hero />
        </section>

        <section id="conteudo">
          <Conteudo />
        </section>
      </div>
    </div>
  );
}

export default App;
