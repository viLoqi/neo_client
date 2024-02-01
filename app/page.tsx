"use client"
import { Button } from './components/Button';
import HomePage from './components/Homepage';
import LoginPage from './components/LoginPage';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup, } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Home() {

    const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
        hd: "stonybrook.edu"
    })
    const [user, loading] = useAuthState(auth);


    if (loading) {
        return (
            <main className="flex justify-center p-24">
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

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        console.log(result.user.email);
    }

    return (
        <main className="">
            <LoginPage onClickSignInWithGoogle={signInWithGoogle}/>
        </main >
    )
}
