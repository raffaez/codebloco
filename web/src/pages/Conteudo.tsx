import { Tab } from "@headlessui/react";
import React, { useEffect, useState } from "react";

import { blocos } from "../components/blocosContent";
import BlocosLista from "../components/BlocosLista";
import { Bloco } from "../models/Bloco";
import { useSearchStore } from "../store/index";

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

  useEffect(() => {
    if (blocosFiltrados && blocosFiltrados.length > 0) {
      setBlocosFiltrados(undefined);
    }

    if (nomeBloco !== "") {
      tituloQuery = { ...tituloQuery, nomeBloco: nomeBloco };
      if (blocosFiltrados !== undefined && blocosFiltrados.length > 0) {
        setBlocosFiltrados(
          blocosFiltrados.filter((bloco) => {
            return bloco.nome
              .toLowerCase()
              .trim()
              .includes(nomeBloco.toLowerCase().trim());
          })
        );
      } else {
        setBlocosFiltrados(
          blocos.filter((bloco) => {
            return bloco.nome
              .toLowerCase()
              .trim()
              .includes(nomeBloco.toLowerCase().trim());
          })
        );
      }
    }

    if (cidade !== "") {
      tituloQuery = { ...tituloQuery, cidade: cidade };
      if (blocosFiltrados && blocosFiltrados.length > 0) {
        setBlocosFiltrados(
          blocosFiltrados.filter((bloco) => {
            return bloco.cidade === cidade;
          })
        );
      } else {
        setBlocosFiltrados(
          blocos.filter((bloco) => {
            return bloco.cidade === cidade;
          })
        );
      }
    }

    setTitulo(
      tituloQuery.nomeBloco !== "" && tituloQuery.cidade !== ""
        ? `Busca: ${tituloQuery.nomeBloco} em ${tituloQuery.cidade}`
        : tituloQuery.nomeBloco !== "" && tituloQuery.cidade === ""
        ? `Busca: ${tituloQuery.nomeBloco}`
        : tituloQuery.nomeBloco === "" && tituloQuery.cidade !== ""
        ? `Busca: em ${tituloQuery.cidade}`
        : "Blocos recomendados"
    );
  }, [cidade, nomeBloco, blocosFiltrados]);

  useEffect(() => {}, [nomeBloco, blocosFiltrados]);

  useEffect(() => {
    if (blocosFiltrados !== undefined) {
      setViews({
        Lista: <BlocosLista blocos={blocosFiltrados} />,
      });
    }
  }, [blocosFiltrados]);

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
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default Conteudo;
