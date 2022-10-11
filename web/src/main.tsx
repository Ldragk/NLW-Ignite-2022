import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' 

{/* O app é um importe do arquivo app.tsx e da função app dentro desse arquivo.
O App está dentro de uma tag, mas o A é maiúsculo, portanto não é uma tag. */}


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />  
  </React.StrictMode>
)
