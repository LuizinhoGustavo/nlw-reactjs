import * as Dialog from "@radix-ui/react-dialog"
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from "react"
import { toast } from 'sonner'

interface NewNoteCardProps{
    onNoteCreated: (content: string) => void
}

let SpeechRecognition: SpeechRecognition | null = null

export function NewNoteCard({onNoteCreated}: NewNoteCardProps){

    const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true) /* No React, para começar a utilizar esse processo de Estado (usuário mudando a "estrutura" da página, temos que usar esse "UseState". O mesmo retorna um array e não podemos simplesmente mudar o valor de "true" para "false", nesse caso, por isso temos que desestruturar o Array do UseState para asi sim mudar esse valor e alterar o estado.) */
    const [isRecording, setIsRecording] = useState(false)
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

        if(content === ''){
            return
        }

        onNoteCreated(content)
        setContent('')
        setShouldShowOnboarding(true)
        
        toast.success('Nota Criada com Sucesso')
    }

    function handleStartRecording(){
        setIsRecording(true)
        setShouldShowOnboarding(false)

        const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window
        || 'webkitSpeechRecognition' in window
        

        if(!isSpeechRecognitionAPIAvailable){
            alert("Infelizmente seu navegador não suporta a API de gravação!")
            return /* Impede que os códigos a baixo sejam executados (nesse bloco!) */
        }

        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

        SpeechRecognition = new SpeechRecognitionAPI()

        SpeechRecognition.lang = 'pt-BR' /* Linguagem que a API vai identificar */
        SpeechRecognition.continuous = true /* Não para de gravar até quando desejado, qunado não temos esse comando, a API para de gravar assim que temos uma pausa */
        SpeechRecognition.maxAlternatives = 1 /* As vezes a API não vai entender uma palavra, então ela retorna várias opções do que pode ser essa palavra, esse código diz para ela trazer apenas 1 alternativa */
        SpeechRecognition.interimResults = true /* Traz o resultado da fala enquanto está falando e não apenas no final */

        SpeechRecognition.onresult = (event) => {
            const trascription = Array.from(event.results).reduce((text, result) =>{
                return text.concat(result[0].transcript)
            }, '')
            
            setContent(trascription)
        }

        SpeechRecognition.onerror = (event) => {
            console.error(event)
        }

        SpeechRecognition.start()
    }

    function handleStopRecording(){
        setIsRecording(false)

        if(SpeechRecognition != null){
            SpeechRecognition.stop()
        }
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
              <Dialog.Content className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 overflow-hidden bg-slate-700 md:rounded-md md:max-w-[640px] w-full md:h-[60vh] flex flex-col"> {/*Conteúdo que vai ser gerado ao presionar o trigger*/}
                <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
                  < X className="size-5"/> {/* Size - coloca tanto o Width quanto o Height para o mesmo tamanho */}
                </Dialog.Close>

                    <div className="flex flex-1 flex-col gap-3 p-5">
                    <span className='text-sm font-medium text-slate-300'>
                        Adicionar Nota
                    </span>

                    {shouldShowOnboarding ? 
                    (<p className='text-sm leading-6 text-slate-400'> Comece <button onClick={handleStartRecording} className="font-md text-lime-400 hover:underline">
                    gravando uma nota</button> em áudio ou se preferir <button type="submit" onClick={handleStartEditor} className="font-md text-lime-400 hover:underline">utilize apenas texto</button>. </p>) 
                    : 
                    <textarea autoFocus onChange={handleContentChanged} value={content} className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"></textarea> }
                    {/* Esse bloco é usado para quando o usuário desejar escrever a nota por meio de texto e clique no "Button - Apenas texto" o Estado mude e permita a User a digitar numa textarea*/}

                    </div>

                    {isRecording ? (
                        <button type="button" onClick={handleStopRecording} className="flex items-center justify-center gap-2 w-full bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100"><div className="size-3 rounded-full bg-red-500 animate-pulse"/> Gravando! (Clique p/ interromeper)</button>
                     ) : (
                        <button type="button" onClick={handleSaveNote} className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bglime">Salvar nota</button>
                     )}

              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </Dialog.Root>
    )
}