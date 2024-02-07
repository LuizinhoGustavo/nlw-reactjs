import * as Dialog from "@radix-ui/react-dialog"
import { X } from 'lucide-react'

export function NewNoteCard(){
    return(
        <Dialog.Root>
            <Dialog.Trigger className='rouded-md flex flex-col bg-slate-700 text-left p-5 gap-3 outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
                <span className='text-sm font-medium text-slate-200'>Adicionar nota</span>
        
                <p className='text-sm leading-6 text-slate-400'>
                Grave uma nota em áudio que será convertida para texto automaticamente.
                </p>
            </Dialog.Trigger>

            <Dialog.Portal> {/*Ao criar o element ele redireciona ele para o body da página e não segue o grid, por exemplo*/}
            <Dialog.Overlay className="inset-0 fixed bg-black/40"> {/* Overlay é o fundo do modal, que faz o efeito que o Modal está em cima do conteúdo*/}
              <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-slate-700 rounded-md max-w-[640px] w-full h-[60vh] flex flex-col"> {/*Conteúdo que vai ser gerado ao presionar o trigger*/}
                <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
                  < X className="size-5"/> {/* Size - coloca tanto o Width quanto o Height para o mesmo tamanho */}
                </Dialog.Close>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <span className='text-sm font-medium text-slate-300'>
                    Adicionar Nota
                  </span>

                  <p className='text-sm leading-6 text-slate-400'>
                    Comece <button className="font-md text-lime-400 hover:underline">gravando uma nota</button> em áudio ou se preferir <button className="font-md text-lime-400 hover:underline">utilize apenas texto</button>.
                  </p>
                </div>
                <button type="button" className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bglime">Salvar nota</button>
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </Dialog.Root>
    )
}