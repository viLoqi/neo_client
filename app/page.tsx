"use client"
import { Button } from './components/Button';
import { initFirebase } from './firebase';
import { GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Home() {
  initFirebase();

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    hd: "stonybrook.edu"
  })
  const auth = getAuth();
  const [ user, loading] = useAuthState(auth);
  

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
          <h1>Welcome {user.displayName}!</h1>
          <Button size='sm' variant='outline' onClick={() => auth.signOut()}>
              Sign Out 
          </Button>
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
