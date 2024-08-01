import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import { useAuthStore } from './store/useAuthStore';
import { useQuery } from '@tanstack/react-query';

function App() {
  const fetchCurrentUser = useAuthStore(state => state.fetchCurrentUser)
  const { isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: fetchCurrentUser,
  });
  if (isLoading) {
    return <h1>Loading...</h1>
  }
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
