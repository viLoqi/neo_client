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
    <ul className='flex gap-7 m-auto font-bold text-2xl	'>
        <li className='hover:text-[#D3D3D3]'>
            <Link to="/Blogs">Blogs</Link>
        </li>
        <li className='hover:text-[#D3D3D3]'>
            <Link to="/News">News</Link>
        </li>
        <li className='hover:text-[#D3D3D3]'>
            <Link to="/Dev">Dev</Link>
        </li>
    </ul>
    <Link to="/login">
    <button className="py-1 px-4 bg-[#FFFFFF] hover:bg-[#D3D3D3] opacity-75 rounded-xl text-[#00704A] font-semibold">
              Login
          </button>
          </Link>
  </nav>
}
