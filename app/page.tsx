"use client"
import ChatBox from './components/Chatbox/Index';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup, } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import LandingPage from './components/LandingPage';
import { Navbar } from './components/Navbar';

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
        <div className='h-screen
                 bg-gradient-to-b from-[#cfe7c4] to-white overflow-auto no-scrollbar'>
            <BrowserRouter>
                <div className="z-20 absolute top-0 left-0 w-full ">
                    <Navbar />
                </div>
                <Routes>
                    <Route path='/' element={<LandingPage />} />
                    <Route path='/login' element={<LoginPage onClickSignInWithGoogle={signInWithGoogle} />} />
                    <Route path='/signup' element={<SignUpPage onClickSignInWithGoogle={signInWithGoogle} />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
