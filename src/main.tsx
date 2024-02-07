import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app' // Retorna a função independente do nome que ela estiver
import { Toaster } from 'sonner'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render( //Buscar a DIV "Root" do HTML (como se fosse getElementById)
  <React.StrictMode>
    <App />
    <Toaster richColors/>
  </React.StrictMode>,
)
