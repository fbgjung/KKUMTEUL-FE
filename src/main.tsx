// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import GlobalStyles from './styles/globalStyles.ts'

createRoot(document.getElementById('root')!).render(
  <>
    <GlobalStyles />
    <App />
  </>,
)

