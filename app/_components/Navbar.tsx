"use client"
import Image from "next/image";
import Link from 'next/link';

import { usePathname } from 'next/navigation';

interface NavBarProps {
    color?: string;
}

export const Navbar = ({ color }: NavBarProps) => {
    const currPath = usePathname();

    const navItem = (name: string, route: string, key: number) => {
        const isActive = route === currPath;

        return (<li className='group relative' key={key}>
            <Link href={route} className={isActive ? "inline-block relative" : ""}>{name}
                <span className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ${isActive ? 'bg-current' : 'group-hover:bg-current bg-transparent'}`} />
            </Link>
        </li>);
    }

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
            <ul className={`flex gap-7 m-auto font-bold text-2xl text-app-secondary`}>
                {links.map(([name, route], i) => navItem(name, route, i))}
            </ul>
            <Link href="/login">
                <button className="py-1 px-6 mr-4 bg-[#FFFFFF] opacity-75 hover:bg-[#D3D3D3] rounded-xl text-[#00704A] font-semibold">
                    Login
                </button>
            </Link>
        </nav>
    )
}
