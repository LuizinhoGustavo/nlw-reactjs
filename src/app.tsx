import { ChangeEvent, useState } from 'react'
import logo from './assets/logoNLW.svg' // No React podemos importar o vetor (svg) dessa forma e apenas coloca-lo no projeto de maneira mais fácil com a tab 'img'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

interface Note {
  id: string
  date: Date
  content: string
  
}

export function App() { //Retona de maneira mais fácil
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')

    if (notesOnStorage){
      return JSON.parse(notesOnStorage)
    }

    return []
  }) /* Array com as notas */

  function onNoteCreated(content: string){
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const notesArray = [newNote, ...notes]

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray)) /* Converte o array em Texto para salvar no navegador */
  }

  function onNoteDeleted(id: string){
    const notesArray = notes.filter(note => {
      return note.id != id
    })

    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function HandleSearch(event: ChangeEvent<HTMLInputElement>){
    const query = event.target.value

    setSearch(query)

  }

  const filteredNotes = search != ''
  ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  :notes

  return( 
    // No react nao podemos colocar 2 elementos em baixo do outro se eles não tiverem envoltos por uma tag meior, como uma div.
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={logo} alt='NLW Expert'/>

      <form className='w-full'>
        <input 
          type="text" 
          placeholder='Busque Suas Notas'
          className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500'
          onChange={HandleSearch}
          />
      </form>

      <div className='h-px bg-slate-700' /> 

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]'>

        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map(note =>{ /*leitura da o array de Notas para criação do elemento */
          return < NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
        })}

      </div>
    </div>
    )//Componentes JSX - HTML convertido para JS
}

/*
Anotações Imporatantes -

  * No React não usamos a palavra 'Class' e sim 'ClassName'
  * As medidas do Tailwind são múltiplas de 4, ou seja o mx-1 é igual a 4px,...
  * space-y -> Essa funionalidade do Tailwind aplica um margin-top em todos os elmentos que não seja o primeiro
  * Comentários dentro de um bloco jsx é entre {} e com o símbolo de comentário dentro
*/
 