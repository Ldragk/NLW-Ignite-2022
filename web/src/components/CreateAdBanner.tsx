import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";


export function CreateAdBanner() {
    return (
        <div className="bg-gradient self-stretch rounded-[0.9rem] w-[79rem] mt-7 mx-auto">
        <div className="bg-[#2A2634] mt-1 self-stretch rounded-lg px-6 py-8 grid grid-cols-2">
          <div className="">
            <strong className="text-white text-2xl block">
              Não encontrou seu Duo?
            </strong>
            <span className="text-zinc-400 block">
              Publique um anúncio para encontrar novos players!
            </span>
          </div>

          <Dialog.Trigger
            className="w-48 h-12 px-3 py-4 ml-[64rem] mt-1 text-white bg-violet-500 hover:bg-violet-700
            box-border rounded-md flex items-center justify-center absolute"
          >
            <MagnifyingGlassPlus size={24} className="mr-2" />            
            Publicar Anúncio
          </Dialog.Trigger>
        </div>
      </div>
    )
}