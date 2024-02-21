import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <div className='p-4 min-h-[calc(100vh-4.5rem)] mt-[4.5rem]'>
        <Outlet />
      </div>
    </>
  )
}

export default App
