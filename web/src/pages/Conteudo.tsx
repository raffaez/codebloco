import { Tab } from "@headlessui/react";
import React, { useEffect, useState } from "react";

import BlocosLista from "../components/BlocosLista";
import { Bloco } from "../models/Bloco";
import { useBlocosStore, useSearchStore } from "../store/index";
import NotFound from "../components/NotFound";
import Map from "../components/Map";
import Spinner from "../components/Spinner";
import Loading from "../components/Loading";
import { XMarkIcon } from "@heroicons/react/20/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Conteudo() {
  const { blocos, loading } = useBlocosStore();
  const cidade = useSearchStore((state) => state.cidade);
  const nomeBloco = useSearchStore((state) => state.nomeBloco);

  const [blocosFiltrados, setBlocosFiltrados] = useState<Bloco[]>([]);

  const [views, setViews] = useState({
    Lista: <BlocosLista blocos={blocos} />,
    Mapa: <Map blocos={blocos} />,
  });

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
      setBlocosFiltrados(filteredBlocks);
    } else {
      setBlocosFiltrados([]);
    }
    getTitulo(nomeBloco, cidade);
  }, [cidade, nomeBloco, loading]);

  useEffect(() => {
    if (blocosFiltrados.length > 0) {
      setViews({
        Lista: <BlocosLista blocos={blocosFiltrados} />,
        Mapa: <Map blocos={blocosFiltrados} />,
      });
    } else {
      setViews({
        Lista: <BlocosLista blocos={blocos} />,
        Mapa: <Map blocos={blocos} />,
      });
    }
  }, [blocosFiltrados, blocos]);

  const resetarBusca = () => {
    useSearchStore.setState({ nomeBloco: "", cidade: "" });
    setBlocosFiltrados([]);
    setNotFound(false);
  };

  const buscarOutro = () => {
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
          <div className="flex flex-col md:flex-row justify-between items-center mx-3 lg:mx-[72px] xl:mx-40 mb-5 md:mb-10 space-y-3 md:space-y-0">
            <div className="flex flex-row items-center space-x-2">
              <h2 className="text-3xl font-extrabold whitespace-pre">
                {titulo}
              </h2>
              {!notFound && (cidade !== "" || nomeBloco !== "") && (
                <XMarkIcon
                  className="h-6 w-6 leading-9 rounded-full bg-red-500 text-white active:animate-spin cursor-pointer hover:bg-red-500/90"
                  onClick={resetarBusca}
                />
              )}
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
