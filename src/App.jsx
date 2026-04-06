import './App.css'
import { Header } from './componentes/header/Header'
import { Footer } from './componentes/footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
