import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './Pages/Home.tsx'
import About from './Pages/About.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RecipeForm from './Pages/Recipes/RecipeForm.tsx'
import NotFound from './Pages/NotFound/404.tsx'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App />} >
    <Route index element={<Home />} />
    <Route path='recipes/create' element={<RecipeForm />} />
    <Route path='recipes/edit/:id' element={<RecipeForm />} />

    <Route path='about' element={<About />} />

    <Route path='*' element={<NotFound />} />
  </Route >)
)
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
