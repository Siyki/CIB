import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Inicio } from './componentes/inicio/Inicio.jsx'
import { Conocenos } from './componentes/conocenos/Conocenos.jsx'
import { Inscribete } from './componentes/inscribete/Inscribete.jsx'
import { Productos } from './componentes/productos/Productos.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Inicio />} />
          <Route path="conocenos" element={<Conocenos />} />
          <Route path="inscribete" element={<Inscribete />} />
          <Route path="productos" element={<Productos />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

