import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router/dom'
import { router } from './router/Routes'
import { ToastContainer } from 'react-toastify'
import FriendsInfoProvider from './context/FriendContextProvider'







createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FriendsInfoProvider>
        <RouterProvider router={router} /> 
  <ToastContainer />
    </FriendsInfoProvider>
  
  </StrictMode>,
)
