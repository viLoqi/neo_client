"use client"
import { Button } from './components/Button';
import HomePage from './components/Homepage';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup, } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Home() {

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    hd: "stonybrook.edu"
  })
  const [user, loading] = useAuthState(auth);


  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center p-24">
        <div>
          <h1>Loading...</h1>
        </div>
      </main >
    )
  }
  if (user) {
    return (
      <main className="flex min-h-screen flex-col items-center p-24">
        <div>
          <HomePage user={user} auth={auth} />
        </div>
      </main >
    )
  }

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user.email);
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div>
      </div>
      LOQI
      <Button size='sm' variant='outline' onClick={signIn}>
        Continue With Google
      </Button>
      <div>
      </div>
    </main >
  )
}
