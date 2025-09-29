import { useSubscribeDev } from '@subscribe.dev/react'
import { SignInScreen } from './components/SignInScreen'
import { VirtualFarm } from './components/VirtualFarm'
import './App.css'

function App() {
  const { isSignedIn, signIn } = useSubscribeDev()

  if (!isSignedIn) {
    return <SignInScreen signIn={signIn} />
  }

  return <VirtualFarm />
}

export default App
