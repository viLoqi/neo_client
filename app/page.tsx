"use client";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import Image from 'next/image';
import { motion } from 'framer-motion';
export default function Index() {
  let features = [
    {
      icon: '/respond.png',
      title: 'Rapid Response Learning',
      //description:'Purus sagittis diam consequat neque risus nam commodo. Vitae risus faucibus habitant mi scelerisque quam eget enim non.'
    },
    {
      icon: '/co-system.png',
      title: 'Collaborative System',
      //description:'Purus sagittis diam consequat neque risus nam commodo. Vitae risus faucibus habitant mi scelerisque quam eget enim non.'
    },
    {
      icon: '/crit-thinking.png',
      title: 'Enhance Critical Thinking',
      //description:'Purus sagittis diam consequat neque risus nam commodo. Vitae risus faucibus habitant mi scelerisque quam eget enim non.'
    },
    {
      icon: '/brain.png',
      title: 'Generative AI-powered',
      //description:'Purus sagittis diam consequat neque risus nam commodo. Vitae risus faucibus habitant mi scelerisque quam eget enim non.'
    },
  ];
  const plans = [
    {
      title: 'Free',
      price: '$0',
      period: 'per month',
      description: 'Free For all',
      buttonText: 'Try for free now',
      features: ['2500 Questions', 'AI-Assisted Question Generation', 'Upload Notes for Context'],
    },
    {
      title: 'Free',
      price: '$0',
      period: 'per month',
      description: 'Free For all',
      buttonText: 'Try for free now',
      features: ['2500 Questions', 'AI-Assisted Question Generation', 'Upload Notes for Context'],
    },
    {
      title: 'Free',
      price: '$0',
      period: 'per month',
      description: 'Free For all',
      buttonText: 'Try for free now',
      features: ['2500 Questions', 'AI-Assisted Question Generation', 'Upload Notes for Context'],
    },
    {
      title: 'Free',
      price: '$0',
      period: 'per month',
      description: 'Free For all',
      buttonText: 'Try for free now',
      features: ['2500 Questions', 'AI-Assisted Question Generation', 'Upload Notes for Context'],
    },

    // {
    //   title: 'Plus',
    //   price: '$7.99',
    //   period: 'per month',
    //   description:
    //     'Semper cras massa sed lobortis egestas non. Parturient eu lorem dui ultricies.',
    //   buttonText: 'Upgrade to plus',
    //   features: [
    //     'Lorem Ipsum',
    //     'Lorem Ipsum',
    //     'Quick search',
    //     'Lorem Ipsum',
    //     'Lorem Ipsum',
    //   ],
    // },
    // {
    //   title: 'Pro',
    //   price: '$7.99',
    //   period: 'per month',
    //   description:
    //     'Semper cras massa sed lobortis egestas non. Parturient eu lorem dui ultricies.',
    //   buttonText: 'Upgrade to Pro',
    //   features: [
    //     'Lorem Ipsum',
    //     'Lorem Ipsum',
    //     'Quick search',
    //     'Lorem Ipsum',
    //     'Lorem Ipsum',
    //   ],
    // },
    // {
    //   title: 'Premium',
    //   price: '$39.99',
    //   period: 'per month',
    //   description:
    //     'Semper cras massa sed lobortis egestas non. Parturient eu lorem dui ultricies.',
    //   buttonText: 'Upgrade to premium',
    //   features: [
    //     '50,000 monthly queries',
    //     'Artwork analysis 200',
    //     'Quick search',
    //     'Prompt library',
    //     'Chat modes',
    //     'Personalized conversation',
    //     '3 days free trial',
    //     'Ad-free experience',
    //     'Premium support',
    //   ],
    // },
  ];
  return (
    <div className='h-screen bg-gradient-to-b bg-[#FBFCFD] overflow-auto no-scrollbar scroll-smooth'>
      <div className="z-20 absolute top-0 left-0 w-screen">
        <Navbar />
      </div>

      {/* Main block */}
      <div className="min-h-screen bg-[#FBFCFD] flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            {/* Text Section */}
            <div className="md:w-1/2 mb-8 mt-12 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-light-primary text-base font-semibold mb-2">Best learning Platform</div>
                <h1 className="text-3xl md:text-6xl font-bold text-gray-900 mb-4 text-center md:text-left">
                  Top Quality <span className="text-light-primary">Education</span> Is Now More Accessible{' '}
                  <span className="text-light-primary">Than Ever!</span>
                </h1>
                <p className="text-gray-600 mb-6 md:w-3/4">
                  A platform leverages the latest technology to enhance your studying experience with personalized and interactive learning tools.
                </p>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center md:items-start">
                  <Link href="/login">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300 w-full md:w-auto">Get Started</button>
                  </Link>
                  <Link href="/waitlist_form">
                    <button className="bg-white border border-gray-300 text-gray-900 px-6 py-2 rounded-md shadow-md hover:bg-gray-400 transition duration-300">Join Waitlist</button>
                  </Link>
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
      <div id="features" className="min-h-screen container mx-auto flex flex-col justify-center items-center py-16 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-light-primary text-base font-semibold mb-2">Features</h2>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">What Can it Do?</h1>
          <p className="text-gray-600 mb-8">
            Tempus vel nulla feugiat ut massa enim tincidunt sit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
                  width={100}
                  height={120}
                  className="mx-auto"
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              {/* <p className="text-gray-500 text-center">
                {feature.description}
            </p> */}
            </motion.div>
          ))}
        </div>
      </div>
      {/* Pricing Plan Section */}
      <div id="pricing-plan" className="py-16 bg-[#FBFCFD] min-h-screen px-4 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-12">
            Pricing Plan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <h3 className="text-light-primary font-semibold mb-2 text-xl">
                  {plan.title}
                </h3>
                <p className="text-gray-600 mb-4 text-center">
                  {plan.description}
                </p>
                <div className="text-gray-900 text-3xl font-bold">
                  {plan.price}
                </div>
                <div className="text-gray-500 text-sm">{plan.period}</div>
                <Link href="/signup">
                  <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 w-full md:w-auto">
                    {plan.buttonText}
                  </button>
                </Link>
                <ul className="mt-6 text-gray-600 text-sm space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-light-primary mr-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/*End Section */}
      <div id="get-started" className="flex flex-col items-center justify-center bg-[#FBFCFD] min-h-screen px-4">
        <motion.div
          className="bg-[#FBFCFD] shadow-lg rounded-lg p-12 text-center max-w-6xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
          <p className="text-gray-600 mb-8 text-lg md:text-xl">
            Begin your journey today and take the first steps toward achieving academic success. 
            Seize every opportunity to enhance your skills and knowledge, making a lasting impression 
            on your instructors. 
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
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:justify-between">
          {/* Left Section */}
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <Link href="/">
              <span className="flex items-center justify-center md:justify-start cursor-pointer">
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
          <div className="text-gray-500 text-center md:text-left mb-4 md:mb-0">
            © 2024 by Loqi. All rights reserved.
          </div>

          {/* Right Section */}
          <div className="flex justify-center md:justify-end space-x-4">
            <a href="#" className="text-gray-500 hover:text-gray-700 transition duration-300">
              <svg
                width="20" height="20" fill="currentColor" className="text-xl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 transition duration-300">
              <svg
                width="20" height="20" fill="currentColor" className="text-xl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Row */}
        <div className=" text-gray-500 text-center">
          <Link href="/">
            <span className="hover:text-gray-700 transition duration-300">Privacy Policy</span>
          </Link>
          <span className="mx-2">•</span>
          <Link href="/terms-of-service">
            <span className="hover:text-gray-700 transition duration-300">Terms of Service</span>
          </Link>
        </div>
      </footer>
    </div>
  )
}

