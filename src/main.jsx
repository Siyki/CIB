import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Inicio } from './paginas/inicio/Inicio.jsx'
import { Conocenos } from './paginas/conocenos/Conocenos.jsx'
import { Inscribete } from './paginas/inscribete/Inscribete.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Inicio />} />
          <Route path="conocenos" element={<Conocenos />} />
          <Route path="inscribete" element={<Inscribete />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

