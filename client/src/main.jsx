import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import UserProvider from './contexts/userContext.jsx'
import ResearchProvider from './contexts/researchContext.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
     <ResearchProvider>
      <App />
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          className: '',
          duration: 3000,
          style: {
            background: '#CAC0C0',
            color: 'red',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: '#CAC0C0',
            },
          },
        }}
      />
      </ResearchProvider>
    </UserProvider>
  </React.StrictMode>
)
