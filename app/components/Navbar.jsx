import React from 'react'
import {Link} from 'react-router-dom';
import Image from "next/image";



export const Navbar = () => {
  return <nav className='flex justify-between items-center '>
    <Link to="/" className=''>
        <Image
            src={'/logo.png'}
            alt='logo'
            width={70}
            height={70}
        />
    </Link>
    <ul className='flex gap-7 m-auto font-bold text-2xl'>
        <li className='group relative'>
            <Link to="/" className='inline-block relative'>
                Home
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent group-hover:bg-current transition-all duration-300"></span>
            </Link>
        </li>
        <li className='group relative'>
            <Link to="/Blogs" className='inline-block relative'>
                Blogs
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent group-hover:bg-current transition-all duration-300"></span>
            </Link>
        </li>
        <li className='group relative'>
            <Link to="/News" className='inline-block relative'>
                News
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent group-hover:bg-current transition-all duration-300"></span>
            </Link>
        </li>
        <li className='group relative'>
            <Link to="/Dev" className='inline-block relative'>
                Dev
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent group-hover:bg-current transition-all duration-300"></span>
            </Link>
        </li>
    </ul>
    <Link to="/login">
    <button className="py-1 px-4 bg-[#FFFFFF] hover:bg-[#D3D3D3] opacity-75 rounded-xl text-[#00704A] font-semibold">
              Login
          </button>
          </Link>
  </nav>
}
