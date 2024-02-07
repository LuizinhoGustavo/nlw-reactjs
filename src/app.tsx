import logo from './assets/logoNLW.svg' // No React podemos importar o vetor (svg) dessa forma e apenas coloca-lo no projeto de maneira mais fácil com a tab 'img'
import { NoteCard } from './components/note-card'

export function App() { //Retona de maneira mais fácil
  return( 
    // No react nao podemos colocar 2 elementos em baixo do outro se eles não tiverem envoltos por uma tag meior, como uma div.
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt='NLW Expert'/>

      <form className='w-full'>
        <input 
          type="text" 
          placeholder='Busque Suas Notas'
          className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500'
          />
      </form>

      <div className='h-px bg-slate-700' /> 

      <div className='grid grid-cols-3 gap-6 auto-rows-[250px]'>

        <div className='rouded-md bg-slate-700 p-5 space-y-3'>
          <span className='text-sm font-medium text-slate-200'>Adicionar nota</span>
          <p className='text-sm leading-6 text-slate-400'>
            Grave uma nota em áudio que será convertida para texto automaticamente.
          </p>
        </div>

        <NoteCard  note={{
          date: new Date(),
          content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus aliquid earum quasi error tempore animi cupiditate, quod reiciendis, accusamus aperiam possimus aspernatur officia quia? Cum, tempore. Explicabo dolore atque illo?"}} /> {/*Import do Component, e mudança das características em cada um dos components*/}

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
 