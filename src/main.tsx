import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './components/AuthProvider'
import { EditModeProvider } from './components/EditModeProvider'
import { ToastProvider } from './components/ToastProvider'
import { ProgressProvider } from './components/ProgressProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <EditModeProvider>
          <ProgressProvider>
            <App />
          </ProgressProvider>
        </EditModeProvider>
      </ToastProvider>
    </AuthProvider>
  </StrictMode>,
)
