import React, { Fragment } from "react";
import { Bloco } from "../models/Bloco";
import { CalendarIcon, MapPinIcon, ShareIcon } from "@heroicons/react/20/solid";
import { urlFor } from "../lib/sanity";
import { Popover, Transition } from "@headlessui/react";
import { SocialIcon } from "react-social-icons";

type Props = {
  bloco: Bloco;
};

function BlocoCard({ bloco }: Props) {
  const msg = `Oi! Eu vou no bloco ${bloco.nome} no dia ${bloco.data} às ${bloco.horario}. Vem comigo! #boraCodar #codeBloco`;
  const wppUrl = `https://wa.me/?text=${encodeURIComponent(msg)}`;
  const ttUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    msg
  )}`;
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=https://www.codebloco.vercel.app&quote=${encodeURIComponent(
    msg
  )}`;

  return (
    <Popover className="relative">
      <div className="w-96 h-80 rounded-lg flex flex-col border border-gray-200">
        <div className="h-40 bg-purple-500 rounded-t-lg">
          <img
            src={urlFor(bloco.imagem).url()}
            className="h-40 w-full object-cover object-center rounded-t-lg opacity-80"
            alt=""
          />
        </div>
        <div className="px-5 h-full flex flex-col justify-center space-y-2">
          <div className="flex justify-between">
            <h3 className="text-lg font-bold text-black-500">{bloco.nome}</h3>
            <Popover.Button>
              <ShareIcon className="w-6 h-6" />
            </Popover.Button>
          </div>
          <p className="text-md text-black-500/75">{bloco.descricao}</p>
          <div className="flex items-center justify-between">
            <div className="flex flex-row space-x-1.5">
              <MapPinIcon className="h-5 w-5 text-red-500" />
              <span className="text-base text-black-500/75">
                {bloco.cidade} - {bloco.estado}
              </span>
            </div>
            <div className="flex flex-row space-x-1.5">
              <CalendarIcon className="h-5 w-5 text-red-500" />
              <span className="text-base text-black-500/75">
                {bloco.data} às {bloco.horario}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-in duration-200"
        enterFrom="opacity-0 translate-x-1"
        enterTo="opacity-100 translate-x-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 translate-x-1"
      >
        <Popover.Panel className="absolute bottom-[105px] right-[15px] z-50">
          <div className="h-10 w-fit bg-white rounded-md flex flex-row items-center justify-end space-x-2">
            <SocialIcon
              url={wppUrl}
              network="whatsapp"
              style={{ height: 28, width: 28 }}
              target="_blank"
              className=" drop-shadow-md"
            />
            <SocialIcon
              url={ttUrl}
              style={{ height: 28, width: 28 }}
              target="_blank"
              className=" drop-shadow-md"
            />
            <SocialIcon
              url={fbUrl}
              style={{ height: 28, width: 28 }}
              target="_blank"
              className=" drop-shadow-md"
            />
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default BlocoCard;
