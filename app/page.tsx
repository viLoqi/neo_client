"use client"
import ChatBox from './components/Chatbox/Index';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup,} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

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
            <ChatBox user={user} auth={auth} />
        )
    }

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        console.log(result.user.email);
    }

    return (
        <div className='h-screen p-24
                        bg-gradient-to-b from-[#cfe7c4] to-white
        '>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LoginPage onClickSignInWithGoogle={signInWithGoogle} />} />
                    <Route path='/signup' element={<SignUpPage onClickSignInWithGoogle={signInWithGoogle}/>} />
                    {/* // <LoginPage onClickSignInWithGoogle={signInWithGoogle} /> */}
                </Routes>
            </BrowserRouter>
        </div>
    )
}
