import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from './Pages/Home'
import Cadastro from './Pages/Cadastro'
import Login from './Pages/Login'

import HomeProtected from './Pages/HomeProtected'
import Atendimento from './Pages/Atendimento'
import Dashboard from './Pages/Dashboard'
import Logout from './Pages/Logout'
import CadastroFunc from './Pages/CadastroFunc'
import CadastroServ from './Pages/CadastroServ'
import UsuarioBarrado from './Pages/UsuarioBarrado'

const publicRoute = createBrowserRouter([{
  path: '/', 
  element:<App />,
  children: [
    {path: '/'                       , element: <Home />},
    {path: '/home'                   , element: <Home />},
    {path: '/cadastro'               , element: <Cadastro />},
    {path: '/login'                  , element: <Login />},
    {path: '/*'                      , element: <Home />}
  ]
}])

const protectedRoute = createBrowserRouter([{
  path: '/', 
  element:<App />,
  children: [
    {path: '/'                          , element: <HomeProtected />},
    {path: '/home'                      , element: <HomeProtected />},
    {path: '/atendimento/:id'           , element: <Atendimento />},
    {path: '/cadastra-funcionario/:id'  , element: <CadastroFunc />},
    {path: '/cadastra-servico/:id'      , element: <CadastroServ />},
    {path: '/dashboards/:id'            , element: <Dashboard />},
    {path: '/logout'                    , element: <Logout />},
    {path: '/usuario-barrado/:id'       , element: <UsuarioBarrado />},
    {path: '/*'                         , element: <HomeProtected />}
  ]
}])

const route = localStorage.getItem('token') === null ? publicRoute : protectedRoute 

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>
)