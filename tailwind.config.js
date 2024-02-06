/** @type {import('tailwindcss').Config} */
export default {
  content: [ //Assim como diz na Doc, é necessário mudar o content para esse código.
  //O content determina quais arquivos do projeto podem conter classes CSS para estilização
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { //"Extend" é usado para extender as propriedades do TailWind que já vem por padrão, exemplo Fonte, Cor
    extend: {
      fontFamily: { //Mudas os estilos de fontes
        sans: ['Inter', 'sans-serif']
      },
    },
  },
  plugins: [],
}

