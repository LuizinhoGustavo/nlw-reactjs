interface NoteCardProps{ // Explicação no final
  note: {
    date: Date
    content: string
  }
}

export function NoteCard({ note }: NoteCardProps){ // Chama a interface e criar o recurso Props
    return(
          <button className='flex flex-col rouded-md text-left bg-slate-800 p-5 gap-3 overflow-hidden outline-none relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
            <span className='text-sm font-medium text-slate-300'>
              {note.date.toISOString()} {/*Chama a propriedade date e converte ela pra string*/}
            </span>
            <p className='text-sm leading-6 text-slate-400'>
              {note.content} {/*Chama a propriedade content*/}
            </p>

            <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none'/>
          </button>
    )
}

/*

Interface ... -> Alguns informações podem variar de component para component, isso permite impedir o erro que os próprios Components vieram consertar, que é a repetição
Nesse caso, podemos criar uma interface que vai armazenar valores para diferenciar cada component


  * Toda vez que for usar uma estrutura JavaScript no  
*/