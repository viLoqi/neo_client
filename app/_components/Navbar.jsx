"use client"
import React from 'react'
// import {Link, NavLink, useLocation} from 'react-router-dom';
import Image from "next/image";
import Link from 'next/link';

export const Navbar = () => {
    // using react router:
    // const location = useLocation();
    // const navItem = (name, route) =>
    //     (<li className='group relative'>
    //         <NavLink
    //             to={route}
    //             className={({ isActive }) =>
    //             `inline-block relative`
    //             }
    //         >
    //             {name}
    //             <span
    //             className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ${
    //                 location.pathname === route ? 'bg-current' : 'group-hover:bg-current bg-transparent'
    //             }`}
    //             />
    //         </NavLink>
    //     </li>);

    const navItem = (name, route) =>
        (<li className='group relative'>
            <Link href={route} /* className={({ isActive }) => `inline-block relative`} */>{name}
                {/* <span className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ${
                    location.pathname === route ? 'bg-current' : 'group-hover:bg-current bg-transparent'
                }`}/> */}
            </Link>
        </li>);

    const links = [["Home", "/"], ["Blogs", "/blog"], ["News", "/news"], ["Dev", "/dev"], ["Pricing", "/pricing"]];

  return (
    <nav className='flex justify-between items-center'>
        <Link href="/login" className='pl-1'>
            <Image
                src={'/logo.png'}
                alt='logo'
                width={70}
                height={70}
            />
        </Link>
        <ul className='flex gap-7 m-auto font-bold text-2xl'>
            {links.map(([name, route]) => navItem(name, route))}
        </ul>
        <Link href="/login">
            <button className="py-1 px-6 mr-4 bg-[#FFFFFF] opacity-75 hover:bg-[#D3D3D3] rounded-xl text-[#00704A] font-semibold">
                Login
            </button>
        </Link>
    </nav>
  )
}
