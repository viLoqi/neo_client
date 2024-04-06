"use client";
import { useRouter } from 'next/navigation';

import { auth } from '@/app/firebase';
import { GoogleAuthProvider, signInWithPopup, } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import ChatBox from "./components/Index"

export default function App() {
    const [user, loading] = useAuthState(auth);
    const { push } = useRouter();

    if (loading) return (
        <main className="flex justify-center p-24">
            <div>
                <h1>Loading...</h1>
            </div>
        </main >
    )

    else if (user) return <ChatBox /* user={user} auth={auth} */ />

    // if user is not logged in, send user to login page
    else push("/login")
}