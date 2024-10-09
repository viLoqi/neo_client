"use client";
import Image from "next/image";
import { useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { auth } from '@/app/_modules/firebase';
import { signInWithPopup } from 'firebase/auth';
import useGoogleProvider from "@/hooks/useGoogleProvider";

const LoginPage = () => {
    const router = useRouter();
    const googleProvider = useGoogleProvider();

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log(`${result.user.email} has logged in, redirecting to /app`);
            router.push("/app");
        } catch (error) {
            console.error("Error signing in with Google: ", error);
        }
    };
    const [selectedRole, setSelectedRole] = useState("Professor");

    const handleRoleClick = (role:string) => {
        setSelectedRole(role);
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Section */}
            <div className="w-1/2 bg-cover bg-center relative hidden md:block" style={{ backgroundImage: "url('/classroom.jpeg')" }}>
                <div className="absolute bottom-0 left-0 p-6 text-white bg-black bg-opacity-50">
                    <p className="text-sm">
                        Penatibus et feugiat sed et dui eget eget. Arcu amet tempor tristique nunc lacus
                        ullamcorper senigen senien egestas. Nisl et consectetur et. Et ultrices dignissim sit posuere.
                        Urna lectus viverra pretium aliquam morbi ut egestas elit convallis. Odio blandit quam
                        consectetur pharetra interdum nullam.
                    </p>
                    <div className="flex justify-center mt-4">
                        <div className="h-1 w-10 bg-white mx-1 rounded-full"></div>
                        <div className="h-1 w-10 bg-gray-400 mx-1 rounded-full"></div>
                        <div className="h-1 w-10 bg-gray-400 mx-1 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-1/2 flex flex-col justify-center p-8 bg-[#FBFCFD] relative">
                {/* Navbar */}
                <div className="absolute top-0 left-0 right-0 p-4 z-10">
                    <div className="flex justify-between items-center">
                        <img src="/loqi.png" alt="Logo" className="h-12" />
                        {/* <Link href="/login">
                            <span className="text-gray-600 hover:text-gray-900">Login</span>
                        </Link> */}
                    </div>
                </div>

                {/* Main content */}
                <div className="">
                    <div className="mb-8 max-w-sm mx-auto">
                        <div className="flex justify-center mb-4">
                        {/* <button
                            onClick={() => handleRoleClick("Professor")}
                            className={`px-4 py-2 mr-2 rounded-full ${
                            selectedRole === "Professor"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-gray-200 text-gray-600"
                            }`}
                        >
                            Professor
                        </button>
                        <button
                            onClick={() => handleRoleClick("Student")}
                            className={`px-4 py-2 rounded-full ${
                            selectedRole === "Student"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-gray-200 text-gray-600"
                            }`}
                        >
                            Student
                        </button> */}
                        </div>
                        <h1 className="text-center text-4xl font-bold text-gray-800 mb-4">Welcome to Loqi</h1>
                        <p className="text-base text-center text-gray-500 mb-6">Get started by logging in.</p>
                        <button 
                            onClick={signInWithGoogle}
                            className="w-full py-2 mb-4 border rounded-full flex items-center justify-center hover:bg-[#E4E9ED] transition duration-300"
                        >
                            <img src="/google-logo.png" alt="Google Logo" className="h-5 mr-2" />
                            Continue with Google
                        </button>
                        <div className="flex items-center mb-4">
                            <hr className="flex-grow border-gray-300" />
                            <span className="mx-4 text-gray-500">OR</span>
                            <hr className="flex-grow border-gray-300" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm text-gray-700 mb-1">Email</label>
                            <input id="email" type="email" className="w-full py-2 px-4 border rounded-md mb-4" placeholder="Your email address" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm text-gray-700 mb-1">Password</label>
                            <input id="password" type="password" className="w-full py-2 px-4 border rounded-md mb-4" placeholder="Password" />
                        </div>
                        <button className="w-full py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300" >Login</button>
                    </div>
                    <p className="text-sm text-gray-500 text-center">
                        By using LOQI you agree to our <Link href="/terms"><span className="underline">terms</span></Link> and <Link href="/privacy"><span className="underline">policy</span></Link>.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
