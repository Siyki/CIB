import './App.css'
import { Header } from './componentes/header/Header'
import { Footer } from './componentes/footer/Footer'
import { Outlet } from 'react-router-dom'
import { FloatingAssistant } from './componentes/ia/FloatingAssistant'
function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">Saltar al contenido principal</a>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <FloatingAssistant />
    </>
  )
}

export default App
