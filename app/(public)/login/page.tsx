"use client"
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { auth } from '@/app/_modules/firebase';
import { signInWithPopup } from 'firebase/auth';
import useGoogleProvider from "@/hooks/useGoogleProvider";

const LoginPage = () => {
    const { push } = useRouter();

    const googleProvider = useGoogleProvider();

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        console.log(`${result.user.email} has logged in, redirecting to /app`);
        push("/app")
    }

    return (
        <div className='flex flex-col items-center'>
            <h1 className='font-bold text-3xl p-10'>Hello, welcome to Loqi!</h1>
            {/* Login box */}
            <form className='mb-3 bg-white shadow-lg'>
                <div className='flex flex-col w-[400px] border pt-6 px-6'>
                    {/* email */}
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Your email</label>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none' id='email' type='email' placeholder='example@gmail.com' />
                    </div>
                    {/* password */}
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Your password</label>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none' id='password' type='password' placeholder='LoqiTheBest' />
                    </div>
                    {/* Sign in button */}
                    <div className='flex justify-center'>
                        <button className=' bg-green-500 hover:bg-green-700 text-white font-bold py-2 w-4/5 rounded-full focus:outline-none' type='button'>
                            Sign In
                        </button>
                    </div>
                    {/* Sign up, forgot password */}
                    <div className='flex items-center justify-between py-6 px-4 font-semibold text-xs text-blue-500'>
                        <Link href={'/signup'} className='hover:text-blue-800'>
                            <u>Don&apos;t have an account?</u>
                        </Link>
                        <a className='hover:text-blue-800' href='#'>
                            <u>
                                Forgot password?
                            </u>
                        </a>
                    </div>
                </div>
            </form>
            {/* Login with Google */}
            {/* <div className='border p-3 rounded-xl hover:bg-gray-200'> */}
            <button className='flex border p-3 rounded-xl bg-white hover:bg-gray-200 items-center w-[210px] justify-between' onClick={signInWithGoogle}>
                <Image
                    src={'/google-logo.png'}
                    alt='google logo'
                    width={20}
                    height={20}
                />
                Sign in with Google
            </button>
            {/* </div> */}
        </div>
    )
}

export default LoginPage