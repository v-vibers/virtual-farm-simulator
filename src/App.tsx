import { useEffect } from 'react'
import { useSubscribeDev } from '@subscribe.dev/react'
import { SignInScreen } from './components/SignInScreen'
import { VirtualFarm } from './components/VirtualFarm'
import './App.css'

function App() {
  const { isSignedIn, signIn, useStorage } = useSubscribeDev()

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

  if (!isSignedIn) {
    return <SignInScreen signIn={signIn} />
  }

  return <VirtualFarm />
}

export default App
