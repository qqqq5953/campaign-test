import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {process.env.NODE_ENV === 'production' ?
      <HashRouter>
        <App />
      </HashRouter>
      :
      <BrowserRouter>
        <App />
      </BrowserRouter>
    }
  </React.StrictMode>
)