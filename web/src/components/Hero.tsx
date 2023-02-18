import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { blocos } from "./blocosContent";
import { Combobox, Transition } from "@headlessui/react";
import {
  ArrowDownIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";

function Hero() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  const cidadesSet = new Set(blocos.map((bloco) => bloco.cidade));
  const cidades = Array.from(cidadesSet).sort();
  const [query, setQuery] = useState("");
  const cidadesFiltradas =
    query === ""
      ? cidades
      : cidades.filter((cidade) =>
          cidade.toLowerCase().includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="w-full overflow-x-hidden h-screen bg-gray-100 relative flex flex-col items-center justify-center space-y-10 space-y-reverse ">
      <div>
        {" "}
        <div className="w-64 h-64 lg:w-[407px] lg:h-[345px] absolute top-0 left-0 bg-top-ilustra bg-no-repeat bg-contain bg-left-top z-0"></div>
        <div className="w-64 h-64 lg:w-[414px] md:h-[330px] absolute bottom-0 right-0 bg-bottom-ilustra bg-no-repeat bg-contain bg-right-bottom z-0"></div>
      </div>

      <div className="flex flex-col items-center mx-2 space-y-5 z-20">
        <div className="uppercase text-red-500 md:text-lg">Find your block</div>
        <strong className="text-center text-3xl md:text-5xl font-bold md:whitespace-pre-line drop-shadow-lg">
          Encontre os <span className="text-purple-500">melhores blocos</span>
          {"\n"}
          de carnaval de 2023
        </strong>
      </div>

      <div className="w-80 md:w-96 lg:w-[993px] h-fit lg:h-32 rounded-md bg-white drop-shadow-sm z-50 flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex h-full flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-5 p-5 items-center">
            <div className="w-72 md:w-[348px] h-12 flex items-center justify-start space-x-2 px-2 rounded-md bg-gray-100 hover:bg-gray-200/60 transition duration-200 ease-in-out text-black-500">
              <div>
                <MagnifyingGlassIcon className="w-5 h-5 text-red-500" />
              </div>
              <input
                type="text"
                defaultValue=""
                placeholder="Pesquise por nome"
                {...register("nomeBloco")}
                className="bg-transparent focus:outline-none"
              />
            </div>

            <div className="w-72 md:w-[348px] h-12 flex items-center rounded-md bg-gray-100 hover:bg-gray-200/60 transition duration-200 ease-in-out">
              <Combobox
                as="span"
                {...register("cidade")}
                className="w-full relative"
              >
                <div className="flex flex-row justify-between px-2">
                  <div className="flex items-center space-x-2">
                    <MapPinIcon className="h-5 w-5 text-red-500" />
                    <Combobox.Input
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Selecione uma cidade"
                      className="bg-inherit focus:outline-none"
                    />
                  </div>
                  <Combobox.Button>
                    <ChevronDownIcon
                      className="h-6 w-6 text-gray-400"
                      aria-hidden
                    />
                  </Combobox.Button>
                </div>
                <Transition
                  as="span"
                  leave="transiton ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery("")}
                  className="absolute mt-3 w-full"
                >
                  <Combobox.Options className="absolute mt-1 max-h-56 w-full overflow-auto rounded-md bg-gray-100 py-1 shadow-lg text-sm md:text-base">
                    {cidadesFiltradas.length === 0 && query !== "" ? (
                      <div className="relative select-none cursor-default px-2 text-base text-gray-700 w-full bg-inherit">
                        Nenhuma cidade encontrada
                      </div>
                    ) : (
                      cidadesFiltradas.map((cidade) => (
                        <Combobox.Option
                          value={cidade}
                          key={cidade}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-red-500 text-white"
                                : "text-black-500"
                            }`
                          }
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {cidade}
                              </span>
                              {selected ? (
                                <span
                                  className={`${
                                    active ? "text-white" : "text-red-500"
                                  } absolute inset-y-0 left-0 flex items-center pl-3`}
                                >
                                  <CheckIcon className="h-5 w-5" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </Combobox>
            </div>

            <input
              type="submit"
              value="Buscar agora"
              className="w-72 md:w-[348px] lg:w-auto bg-purple-500 hover:bg-purple-500/90 active:brightness-25 px-8 py-3 rounded-md cursor-pointer text-white uppercase text-sm font-semibold tracking-wider transition duration-200 ease-in-out"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Hero;
