import { useEffect, useState } from 'react'
import { useSubscribeDev } from '@subscribe.dev/react'
import { SignInScreen } from './components/SignInScreen'
import { VirtualFarm } from './components/VirtualFarm'
import './App.css'

function App() {
  const { isSignedIn, signIn, useStorage } = useSubscribeDev()
  const [showSignIn, setShowSignIn] = useState(false)

  // Handle dark mode for unauthenticated users (use localStorage)
  useEffect(() => {
    if (!isSignedIn) {
      const savedDarkMode = localStorage.getItem('dark-mode')
      if (savedDarkMode === 'true') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [isSignedIn])

  // In development/demo mode, allow using the app without signing in
  if (!isSignedIn && showSignIn) {
    return <SignInScreen signIn={signIn} onSkip={() => setShowSignIn(false)} />
  }

  return <VirtualFarm onShowSignIn={() => setShowSignIn(true)} />
}

export default App
