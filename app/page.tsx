"use client";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import Image from 'next/image';
import { motion } from 'framer-motion';

// aka landing page
export default function Index() {
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
        <div className='h-screen bg-gradient-to-b bg-[#FBFCFD] overflow-auto no-scrollbar'>
            <div className="z-20 absolute top-0 left-0 w-screen">
                <Navbar />
            </div>

            {/* Main content block */}
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center">
                        {/* Text Section */}
                        <div className="md:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="text-blue-600 text-base font-semibold mb-2">Best learning Platform</div>
                                <h1 className="text-6xl font-bold text-gray-900 mb-4">
                                    Top Quality <span className="text-blue-600">Education</span> Is Now More Accessible{' '}
                                    <span className="text-blue-600">Than Ever!</span>
                                </h1>
                                <p className="text-gray-600 mb-6 md:w-3/4">
                                    Odio pretium cras proin sit duis vel eget tincidunt vel. Pulvinar luctus id aliquam
                                    molestie amet massa sapien.
                                </p>
                                <div className="flex space-x-4">
                                    <button className="bg-blue-600 text-white px-6 py-2 rounded-md">Get Started</button>
                                    <button className="bg-white border border-gray-300 text-gray-900 px-6 py-2 rounded-md">Learn More</button>
                                </div>
                            </motion.div>
                        </div>

                        {/* Image Section */}
                        <div className="md:w-1/2 mt-8 md:mt-0 grid grid-cols-2 gap-4">
                            {["/lp-topleft.png", "/lp-topright.png", "/lp-botleft.png", "/lp-botright.png"].map((src, i) => (
                                <motion.div
                                    key={i}
                                    className="rounded-lg flex items-center justify-center"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.2 }}
                                >
                                    <Image
                                        src={src}
                                        alt={`Img ${i + 1}`}
                                        width={300}
                                        height={300}
                                        className="rounded-lg"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="h-screen container mx-auto flex flex-col justify-center items-center py-16 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-blue-600 text-base font-semibold mb-2">Features</h2>
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">What Can it Do?</h1>
                    <p className="text-gray-600 mb-8">
                        Tempus vel nulla feugiat ut massa enim tincidunt sit.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            className="bg-white rounded-lg p-6 shadow-md"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.2 }}
                        >
                            <div className="mb-4">
                                <Image
                                    src={feature.icon}
                                    alt={feature.title}
                                    width={50}
                                    height={50}
                                    className="mx-auto"
                                />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>

            <footer className="w-full p-4 mt-auto">
                {/* Footer content */}
            </footer>
        </div>
    )
}
