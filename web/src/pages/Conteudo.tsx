import { Tab } from "@headlessui/react";
import React, { useEffect, useState } from "react";

import { blocos } from "../components/blocosContent";
import BlocosLista from "../components/BlocosLista";
import { Bloco } from "../models/Bloco";
import { useSearchStore } from "../store/index";
import NotFound from "../components/NotFound";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Conteudo() {
  const cidade = useSearchStore((state) => state.cidade);
  const nomeBloco = useSearchStore((state) => state.nomeBloco);

  const [listaBlocos, setListaBlocos] = useState<Bloco[]>(blocos);
  const [blocosFiltrados, setBlocosFiltrados] = useState<Bloco[]>();

  let tituloQuery = {
    nomeBloco: "",
    cidade: "",
  };

  const [views, setViews] = useState({
    Lista: <BlocosLista blocos={listaBlocos} />,
  });

  const [titulo, setTitulo] = useState("Blocos recomendados");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let filteredBlocks = blocos;

    if (nomeBloco !== "") {
      filteredBlocks = filteredBlocks.filter((bloco) =>
        bloco.nome.toLowerCase().trim().includes(nomeBloco.toLowerCase().trim())
      );
    }

    if (cidade !== "") {
      filteredBlocks = filteredBlocks.filter(
        (bloco) => bloco.cidade === cidade
      );
    }

    if (blocosFiltrados && blocosFiltrados.length > 0) {
      if (filteredBlocks.length > 0) {
        setBlocosFiltrados(
          blocosFiltrados.filter((bloco) => filteredBlocks.includes(bloco))
        );
      } else {
        setBlocosFiltrados(undefined);
      }
    } else {
      setBlocosFiltrados(filteredBlocks);
    }

    const nomeBlocoText = nomeBloco !== "" ? nomeBloco : "";
    const cidadeText = cidade !== "" ? ` em ${cidade}` : "";
    setTitulo(
      nomeBlocoText !== "" && cidadeText !== ""
        ? `Busca: ${nomeBlocoText} em ${cidadeText}`
        : nomeBlocoText !== "" && cidadeText === ""
        ? `Busca: ${nomeBlocoText}`
        : nomeBlocoText === "" && cidadeText !== ""
        ? `Busca: em ${cidadeText}`
        : "Blocos recomendados"
    );
    setNotFound(filteredBlocks.length === 0);
  }, [cidade, nomeBloco, blocos, blocosFiltrados]);

  useEffect(() => {
    if (blocosFiltrados !== undefined) {
      setViews({
        Lista: <BlocosLista blocos={blocosFiltrados} />,
      });
    } else {
      setViews({
        Lista: <BlocosLista blocos={listaBlocos} />,
      });
    }
  }, [blocosFiltrados]);

  const resetarBusca = () => {
    useSearchStore.setState({ nomeBloco: "", cidade: "" });
    setBlocosFiltrados(undefined);
    setNotFound(false);
  };

  const buscarOutro = () => {
    window.location.href = "/#hero";
  };

  const button = (
    <>
      <button
        onClick={resetarBusca}
        className="w-full bg-red-500 hover:bg-red-500/90 text-white font-bold py-2 px-4 rounded focus:outline-none transition duration-200 text-xl"
        type="button"
      >
        Ver blocos recomendados
      </button>
      <button
        onClick={buscarOutro}
        className="w-full bg-purple-500 hover:bg-purple-500/90 text-white font-bold py-2 px-4 rounded focus:outline-none transition duration-200 text-xl"
        type="button"
      >
        Procurar outro bloco
      </button>
    </>
  );

  return (
    <div className="h-screen w-screen">
      <Tab.Group>
        <div className="max-w-screen overflow-x-hidden relative flex flex-col space-y-reverse space-y-10 pt-20">
          <div className="flex justify-between items-center mx-3 lg:mx-[72px] xl:mx-40 mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold">{titulo}</h2>
            <div className="w-36 md:w-48">
              <Tab.List className="flex space-x-1 rounded-md border border-gray-200 p-2">
                {Object.keys(views).map((view) => (
                  <Tab
                    key={view}
                    className={({ selected }) =>
                      classNames(
                        "w-full py-2.5 text-sm text-center rounded-md text-purple-500 font-bold uppercase focus:outline-none transition duration-200 ease-in-out tracking-wide",
                        selected
                          ? "bg-purple-500 text-white hover:bg-purple-500/90 "
                          : "bg-white text-purple-500 hover:bg-purple-500/10"
                      )
                    }
                  >
                    {view}
                  </Tab>
                ))}
              </Tab.List>
            </div>
          </div>
        </div>
        <Tab.Panels>
          {Object.values(views).map((conteudo, index) => (
            <Tab.Panel key={index}>{conteudo}</Tab.Panel>
          ))}
          {notFound && <NotFound button={button} />}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default Conteudo;
