import React from 'react'
import {Link, NavLink, useLocation} from 'react-router-dom';
import Image from "next/image";



export const Navbar = () => {
    const location = useLocation();
  return (
    <nav className='flex justify-between items-center'>
    <Link to="/" className='pl-1'>
        <Image
            src={'/logo.png'}
            alt='logo'
            width={70}
            height={70}
        />
    </Link>
    <ul className='flex gap-7 m-auto font-bold text-2xl'>
        <li className='group relative'>
            <NavLink 
                to="/" 
                className={({ isActive }) =>
                `inline-block relative`
                }
            >
                Home
                <span 
                className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ${
                    location.pathname === '/' ? 'bg-current' : 'group-hover:bg-current bg-transparent'
                }`}
                />
            </NavLink>
        </li>
        <li className='group relative'>
            <NavLink 
                to="/Blogs" 
                className={({ isActive }) =>
                `inline-block relative`
                }
            >
                Blogs
                <span 
                className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ${
                    location.pathname === '/Blogs' ? 'bg-current' : 'group-hover:bg-current bg-transparent'
                }`}
                />
            </NavLink>
        </li>
        <li className='group relative'>
            <NavLink 
                to="/News" 
                className={({ isActive }) =>
                `inline-block relative`
                }
            >
                News
                <span 
                className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ${
                    location.pathname === '/News' ? 'bg-current' : 'group-hover:bg-current bg-transparent'
                }`}
                />
            </NavLink>
        </li>
        <li className='group relative'>
            <NavLink 
                to="/Dev" 
                className={({ isActive }) =>
                `inline-block relative`
                }
            >
                Dev
                <span 
                className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ${
                    location.pathname === '/Dev' ? 'bg-current' : 'group-hover:bg-current bg-transparent'
                }`}
                />
            </NavLink>
        </li>
    </ul>
    <Link to="/login">
    <button className="py-1 px-6 mr-4 bg-[#FFFFFF] opacity-75 hover:bg-[#D3D3D3] rounded-xl text-[#00704A] font-semibold">
              Login
          </button>
          </Link>
  </nav>

  ) 
}
