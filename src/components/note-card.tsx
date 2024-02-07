import * as Dialog from "@radix-ui/react-dialog"
import { formatDistanceToNow } from 'date-fns' /* Uma biblioteca Js para trabalhar com data, nesse caso ele pega o momento da criação de um elemento e marca no local indicado, nesse caso em conjunto com o interface, ou seja se o elemento foi crado há 1 minuto ou 1 dia, ele vai mostrar no local indicado (nesse caso, o Span) */
import { ptBR } from 'date-fns/locale' /* Aqui é uma funcionalidade que traz o idioma desejado para adicionar um sufixo ou prefixo */
import { X } from 'lucide-react'

interface NoteCardProps{ // Explicação no final
  note: {
    date: Date
    content: string
  }
}

export function NoteCard({ note }: NoteCardProps){ // Chama a interface e criar o recurso Props
    return(
      <Dialog.Root>
          <Dialog.Trigger className='flex flex-col rouded-md text-left bg-slate-800 p-5 gap-3 overflow-hidden outline-none relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
            <span className='text-sm font-medium text-slate-300'>
            {formatDistanceToNow(note.date, {locale: ptBR, addSuffix: true})} {/*Chama a propriedade date e converte ela pra string*/}
            </span>
            <p className='text-sm leading-6 text-slate-400'>
              {note.content} {/*Chama a propriedade content*/}
            </p>

            <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none'/>
          </Dialog.Trigger>

          <Dialog.Portal> {/*Ao criar o element ele redireciona ele para o body da página e não segue o grid, por exemplo*/}
            <Dialog.Overlay className="inset-0 fixed bg-black/40"> {/* Overlay é o fundo do modal, que faz o efeito que o Modal está em cima do conteúdo*/}
              <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-slate-700 rounded-md max-w-[640px] w-full h-[60vh] flex flex-col"> {/*Conteúdo que vai ser gerado ao presionar o trigger*/}
                <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
                  < X className="size-5"/> {/* Size - coloca tanto o Width quanto o Height para o mesmo tamanho */}
                </Dialog.Close>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <span className='text-sm font-medium text-slate-300'>
                    {formatDistanceToNow(note.date, {locale: ptBR, addSuffix: true})} {/* Adiciona as funcionalidade do Date-fns e aplica o "prefixo" (no código está suixo, por que no inglês seria - "1 minute AGO", por exempo) */}
                  </span>

                  <p className='text-sm leading-6 text-slate-400'>
                    {note.content} {/*Chama a propriedade content*/}
                  </p>
                </div>

                <button type="button" className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group">Deseja <span className="text-red-400 group-hover:underline">apagar esse nota?</span></button>
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
      </Dialog.Root>
    )
}

/*

Interface ... -> Alguns informações podem variar de component para component, isso permite impedir o erro que os próprios Components vieram consertar, que é a repetição
Nesse caso, podemos criar uma interface que vai armazenar valores para diferenciar cada component


  * Toda vez que for usar uma estrutura JavaScript no JSX é preciso coloca-la entre {chaves}
  * Radix - Biblioteca de elementos porém sem o estilo aplicado, apenas a estrutura.
  * date-fns - biblioteca para lidar com Datas no JS
  
  *TAILWIND - No tailwind caso queira aplicar um estilo num elemento filho, porém "utilizando" o elemento pai basta criar uma tag chamada "Group" e ao usar o código basta colocar a tag group antes do código, exemplo - group-hover: underlined
*/