import React from 'react'
import Image from "next/image";

const LoginPage = ({ onClickSignInWithGoogle }: { onClickSignInWithGoogle: () => Promise<void> }) => {
    return (
        <div className='h-screen flex flex-col items-center p-24 
                        bg-gradient-to-b from-[#cfe7c4] to-white
        '>
            <h1 className='font-bold text-3xl p-10'>Hello, welcome to Loqi!</h1>
            {/* Login box */}
            <form className='mb-3 bg-white shadow-lg'>
                <div className='flex flex-col w-[400px] h-80 border p-6'>
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
                        <button className='hover:text-blue-800'>
                            <u>Don&apos;t have an account?</u>
                        </button>
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
            <button className='flex border p-3 rounded-xl hover:bg-gray-200 items-center w-[210px] justify-between' onClick={onClickSignInWithGoogle}>
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