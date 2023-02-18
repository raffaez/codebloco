import BlocosLista from "./components/BlocosLista";
import Hero from "./components/Hero";
import "./global.css";
import Conteudo from "./pages/Conteudo";

function App() {
  return (
    <div className="max-w-screen overflow-x-hidden">
      <div className="w-screen h-screen flex flex-col">
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
