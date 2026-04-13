import './App.css'
import { Header } from './componentes/header/Header'
import { Footer } from './componentes/footer/Footer'
import { Outlet } from 'react-router-dom'
import { FloatingAssistant } from './componentes/ia/FloatingAssistant'
function App() {
  return (
    <>
      <Header />
      <main role="main">
        <Outlet />
      </main>
      <Footer />
      <FloatingAssistant />
    </>
  )
}

export default App
