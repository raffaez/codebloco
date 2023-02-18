import React, { useState } from "react";
import BlocosLista from "../components/BlocosLista";
import { Tab } from "@headlessui/react";
import BlocoCard from "../components/BlocoCard";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Conteudo() {
  let [views] = useState({
    Lista: <BlocosLista />,
    Mapa: "mapa",
  });

  return (
    <div className="h-screen w-screen">
      <Tab.Group>
        <div className="max-w-screen overflow-x-hidden relative flex flex-col space-y-reverse space-y-10 pt-20">
          <div className="flex justify-between items-center mx-3 lg:mx-[72px] xl:mx-40 mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold">
              Blocos recomendados
            </h2>
            <div className="w-36 md:w-48">
              {/* <Tab.Group> */}
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
              {/* </Tab.Group> */}
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
