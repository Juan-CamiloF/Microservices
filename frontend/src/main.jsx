import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Profile from './components/Profile'
import Index from './components/TableUsers'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="dark:bg-gray-900">
      <App />
    </div>
   
  </React.StrictMode>,
)
