import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Navbar: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [currentPath, setCurrentPath] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    if (mounted) {
      const { pathname } = window.location;
      setCurrentPath(pathname);
    }
  }, [mounted]);

  const navLinks = [
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/testimonials', label: 'Testimonials' },
  ];

  if (!mounted || currentPath === null) {
    return null; // or a loading spinner
  }

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-[#FBFCFD]">
      <div className="flex items-center">
        <Link href="/" passHref>
          <span className="flex items-center cursor-pointer">
            <Image
              src={'/loqi.png'}
              alt='logo'
              width={60}
              height={60}
            />
            {/* <span className="ml-2 text-lg font-bold text-[#333B40]">LOGO</span> */}
          </span>
        </Link>
        <ul className="flex gap-8 ml-8 font-medium text-[#5A666E]">
          {navLinks.map((link) => (
            <li key={link.href} className="relative group">
              <Link href={link.href} passHref>
                <span className={`cursor-pointer ${currentPath === link.href ? 'text-blue-600' : ''}`}>
                  {link.label}
                </span>
              </Link>
              <span
                className={`absolute left-0 bottom-0 h-0.5 w-full bg-blue-600 transition-all duration-300 scale-x-0 group-hover:scale-x-100 origin-left ${
                  currentPath === link.href ? 'scale-x-100' : ''
                }`}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/signup" passHref>
        <span className="cursor-pointer text-blue-600 bg-transparent rounded-full transition-all duration-300 hover:text-lg hover:scale-105">
          Sign Up
        </span>
        </Link>
        <Link href="/login" passHref>
          <button className="py-2 px-6 bg-blue-600 text-white rounded-full transition transform duration-300 hover:bg-blue-700 hover:shadow-lg hover:scale-105">
            Log In
          </button>
        </Link>
      </div>
    </nav>
  );
};
