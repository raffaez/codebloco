import { Tab } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";

import BlocosLista from "../components/BlocosLista";
import Loading from "../components/Loading";
import Map from "../components/Map";
import NotFound from "../components/NotFound";
import { useBlocosStore, useSearchStore } from "../store";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Conteudo() {
  const { blocos, loading } = useBlocosStore();
  const cidade = useSearchStore((state) => state.cidade);
  const nomeBloco = useSearchStore((state) => state.nomeBloco);

  const views = {
    Lista: <BlocosLista />,
    Mapa: <Map />,
  };

  const [titulo, setTitulo] = useState("Blocos recomendados");
  const [notFound, setNotFound] = useState(false);

  const getTitulo = (nomeBlocoText: string, cidadeText: string) => {
    setTitulo(
      nomeBlocoText !== "" && cidadeText !== ""
        ? `Busca: ${nomeBlocoText} em ${cidadeText}`
        : nomeBlocoText !== "" && cidadeText === ""
        ? `Busca: ${nomeBlocoText}`
        : nomeBlocoText === "" && cidadeText !== ""
        ? `Busca: em ${cidadeText}`
        : "Blocos recomendados"
    );
  };

  useEffect(() => {
    let filteredBlocks = blocos;

    if (nomeBloco !== "") {
      filteredBlocks = filteredBlocks.filter((bloco) => {
        return bloco.nome
          .toLowerCase()
          .trim()
          .includes(nomeBloco.toLowerCase().trim());
      });
    }

    if (cidade !== "") {
      filteredBlocks = filteredBlocks.filter(
        (bloco) => bloco.cidade === cidade
      );
    }

    setNotFound(filteredBlocks.length === 0);
    if (filteredBlocks.length > 0) {
      useBlocosStore.setState({ blocosFiltrados: filteredBlocks });
    } else {
      useBlocosStore.setState({ blocosFiltrados: [] });
    }
    getTitulo(nomeBloco, cidade);
  }, [cidade, nomeBloco, loading]);

  const resetarBusca = () => {
    useSearchStore.setState({ nomeBloco: "", cidade: "" });
    useBlocosStore.setState({ blocosFiltrados: [] });
    setNotFound(false);
  };

  const buscarOutro = () => {
    resetarBusca();
    window.location.href = "/#hero";
  };

  const button = (
    <>
      <button
        onClick={resetarBusca}
        className="w-full uppercase bg-red-500 hover:bg-red-500/90 text-white font-bold py-2 px-4 rounded focus:outline-none transition duration-200 text-sm"
        type="button"
      >
        Ver blocos recomendados
      </button>
      <button
        onClick={buscarOutro}
        className="w-full uppercase bg-purple-500 hover:bg-purple-500/90 text-white font-bold py-2 px-4 rounded focus:outline-none transition duration-200 text-sm"
        type="button"
      >
        Procurar outro bloco
      </button>
    </>
  );

  return (
    <div className="min-h-screen w-screen mb-5">
      <Tab.Group>
        <div className="max-w-screen overflow-x-hidden relative flex flex-col space-y-reverse space-y-10 pt-16">
          <div className="flex flex-col md:flex-row justify-between mx-3 md:mx-10 xl:mx-40 items-center mb-5 md:mb-10 space-y-3 md:space-y-0">
            <div className="text-3xl font-extrabold whitespace-pre-line ">
              {!notFound && (cidade !== "" || nomeBloco !== "") && (
                <XMarkIcon
                  className="h-6 w-6 mr-2 mb-1 p-0.5 inline leading-9 rounded-full bg-red-500 text-white active:animate-spin cursor-pointer hover:bg-red-500/90"
                  onClick={buscarOutro}
                />
              )}
              {titulo}
            </div>
            <div className="w-full md:w-48">
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
          {loading ? (
            <Loading />
          ) : notFound ? (
            <NotFound button={button} />
          ) : (
            Object.values(views).map((conteudo, index) => (
              <Tab.Panel key={index}>{conteudo}</Tab.Panel>
            ))
          )}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default Conteudo;
