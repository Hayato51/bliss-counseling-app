import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import SurveyPage from './pages/SurveyPage'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
              <Routes>
                      <Route path="/survey/:id" element={<SurveyPage />} />
                      <Route path="/*" element={<App />} />
              </Routes>Routes>
        </BrowserRouter>BrowserRouter>
    </React.StrictMode>React.StrictMode>
  )</React.StrictMode>
