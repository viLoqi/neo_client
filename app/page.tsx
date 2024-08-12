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

            {/* Main block */}
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
                                    <button className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300">Get Started</button>
                                    <button className="bg-white border border-gray-300 text-gray-900 px-6 py-2 rounded-md shadow-md hover:bg-gray-400 transition duration-300">Learn More</button>
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
            {/*End Section */}
            <div className="flex flex-col items-center justify-center py-16 bg-[#FBFCFD]">
                <motion.div
                className="bg-white shadow-lg rounded-lg p-12 text-center max-w-4xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
                    <p className="text-gray-600 mb-8">
                        Lorem ipsum dolor sit amet consectetur. Lacus aliquet vitae nulla netus sollicitudin.
                        In enim tortor sed libero velit lectus. Egestas facilisi neque a arcu vitae dignissim.
                        Sit lobortis orci risus volutpat eu habitasse.
                    </p>
                    <Link href="/login">
                    <span className="inline-block bg-blue-600 text-white py-3 px-8 rounded-full shadow-md hover:bg-blue-700 transition duration-300">
                    Get Started →
                    </span>
                    </Link>
                </motion.div>
            </div>
             {/* Footer Section */}
      <footer className="bg-[#FBFCFD] py-12">
        {/* Top Row*/}
        <div className="relative container mx-auto flex items-center">
          {/* Left Section */}
          <div className="flex flex-col items-start">
            <Link href="/">
              <span className="flex items-center cursor-pointer">
                <Image
                  src={'/loqi.png'}
                  alt='logo'
                  width={60}
                  height={60}
                />
              </span>
            </Link>
          </div>

          {/* Middle Section */}
          <div className="absolute left-1/2 transform -translate-x-1/2 text-gray-500 text-center">
            © 2024 by [Product Name]. All rights reserved.
          </div>

          {/* Right Section */}
          <div className="ml-auto flex items-center space-x-4">
            <a href="#" className="text-gray-500 hover:text-gray-700 transition duration-300">
              <svg width="20" height="20" fill="currentColor" className="text-xl">
                <path d="M18 2H2C.89 2 0 2.89 0 4v12c0 1.11.89 2 2 2h8v-7H8V9h2V7c0-2.21 1.79-4 4-4h2v3h-2c-.55 0-1 .45-1 1v2h3l-.75 3H13v7h5c1.11 0 2-.89 2-2V4c0-1.11-.89-2-2-2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-1 text-gray-500 text-center">
          <Link href="/">
            <span className="hover:text-gray-700 transition duration-300">Privacy Policy</span>
          </Link>
          <span className="mx-2">•</span>
          <Link href="/terms-of-service">
            <span className="hover:text-gray-700 transition duration-300">Terms of Service</span>
          </Link>
          {/* <p className="text-gray-500 mt-2">Realized by Bilal Gondal</p> */}
        </div>
      </footer>
        </div>
    )
}
