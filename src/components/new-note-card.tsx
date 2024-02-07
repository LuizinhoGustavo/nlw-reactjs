import * as Dialog from "@radix-ui/react-dialog"
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from "react"
import { toast } from 'sonner'

interface NewNoteCardProps{
    onNoteCreated: (content: string) => void
}

export function NewNoteCard({onNoteCreated}: NewNoteCardProps){

    const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true) /* No React, para começar a utilizar esse processo de Estado (usuário mudando a "estrutura" da página, temos que usar esse "UseState". O mesmo retorna um array e não podemos simplesmente mudar o valor de "true" para "false", nesse caso, por isso temos que desestruturar o Array do UseState para asi sim mudar esse valor e alterar o estado.) */
    const [content, setContent] = useState('')

    function handleStartEditor(){
        setShouldShowOnboarding(false)
    }

    function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>){
        setContent(event.target.value)
        if(event.target.value === ''){
            setShouldShowOnboarding(true)
        } {/* Nesse bloco, qunado o user apagar todo o texto de dentro da textarea, o setShouldShowOnboarding vai voltar a ser true, mostrando novamente o texto, por meio da condicional mais à baixo */}
    }

    function handleSaveNote(event: FormEvent){
        event.preventDefault()

        onNoteCreated(content)

        setContent('')
        setShouldShowOnboarding(true)

        toast.success('Nota Criada com Sucesso')
    }

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

                <form onSubmit={handleSaveNote} className="flex-1 flex flex-col">
                    <div className="flex flex-1 flex-col gap-3 p-5">
                    <span className='text-sm font-medium text-slate-300'>
                        Adicionar Nota
                    </span>

                    {shouldShowOnboarding ? 
                    (<p className='text-sm leading-6 text-slate-400'> Comece <button className="font-md text-lime-400 hover:underline">
                    gravando uma nota</button> em áudio ou se preferir <button onClick={handleStartEditor} className="font-md text-lime-400 hover:underline">utilize apenas texto</button>. </p>) 
                    : 
                    <textarea autoFocus onChange={handleContentChanged} value={content} className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"></textarea> }
                    {/* Esse bloco é usado para quando o usuário desejar escrever a nota por meio de texto e clique no "Button - Apenas texto" o Estado mude e permita a User a digitar numa textarea*/}

                    </div>

                    <button type="submit" className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bglime">Salvar nota</button>
                </form>
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </Dialog.Root>
    )
}