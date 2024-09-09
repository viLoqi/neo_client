import React from "react";
import Head from 'next/head';
// import Feature from '../components/Feature';
// import { Navbar } from "./Navbar";


const LandingPage = () => {
    let features = [
        {
            icon: '/respond.png',
            title: 'Rapid Response Learning',
        },
        {
            icon: '/co-system.png',
            title: 'Collaborative System',
        },
        {
            icon: '/crit-thinking.png',
            title: 'Enhance Critical Thinking',
        },
        {
            icon: '/brain.png',
            title: 'Generative AI-powered',
        },
    ];

    return (
        <div className="min-h-screen text-white flex flex-col items-center justify-center">

            {/* <div className="z-20 absolute top-0 left-0 w-screen">
                <Navbar />
            </div> */}
            {/* Main content block */}
            <div className="w-full bg-[url('/background-block.webp')] bg-no-repeat bg-cover bg-center z-10 rounded-b-[40px] flex flex-col justify-center items-center py-24 px-12 mb-24"
                style={{ backgroundPosition: 'center 20%' }} >
                <h1 className="text-5xl font-semibold mb-10">
                    LOQI
                </h1>
                <p className="mt-3 text-5xl font-semibold mb-10">
                    AI-powered collaborative and personalized learning.
                </p>
                <button className="text-xl mt-6 py-4 px-8 bg-[#FFFFFF] opacity-75 rounded-2xl text-[#00704A] font-semibold transition-transform duration-200 hover:scale-105 hover:bg-opacity-100">
                    Join waitlist
                </button>
            </div>
            {/* <div className="text-center mb-20 z-10">
                <div className="absolute left-0 right-0 top-0 mx-0 w-screen h-96 bg-[url('/background-block.webp')] bg-no-repeat bg-cover bg-center -z-10 rounded-b-[40px]"
                    style={{ backgroundPosition: 'center 20%' }} />
                <div className="mb-32">
                    <h1 className="text-5xl font-semibold mb-10">
                        LOQI
                    </h1>
                    <p className="mt-3 text-5xl font-semibold mb-10">
                        AI-powered collaborative and personalized learning.
                    </p>
                    <button className="text-xl mt-6 py-4 px-8 bg-[#FFFFFF] opacity-75 rounded-2xl text-[#00704A] font-semibold transition-transform duration-200 hover:scale-105 hover:bg-opacity-100">
                        Join waitlist
                    </button>
                </div>
            </div> */}

            {/* Features */}
            <div className="">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4">
                    {/* {features.map((feature, index) => (
                        <Feature
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                        />
                    ))} */}
                </div>
            </div>

            <footer className="w-full p-4 mt-auto">
            </footer>
        </div>
    );
};

export default LandingPage;