import { createBrowserRouter, Router, RouterProvider } from "react-router-dom"

import { Home } from "./pages/Home"
import { Welcome } from "./pages/Welcome"

import { Login } from "./pages/Login"
import { Register } from "./pages/Register"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/chats',
    element: <Home />
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export { App }
