import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import { AuthProvider } from './features/Shared/context/AuthContext.tsx'
import { UserMenuProvider } from './features/Shared/context/UserMenuContext.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
        <UserMenuProvider>
         <App/>
        </UserMenuProvider>
      </AuthProvider>
  </StrictMode>,
)