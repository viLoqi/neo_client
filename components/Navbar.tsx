import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface NavLinkProps {
  href: string;
  label: string;
}

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

  const navLinks: NavLinkProps[] = [
    { href: '/', label: 'Home' },
    { href: '/blogs', label: 'Blogs' },
    { href: '/news', label: 'News' },
    { href: '/dev', label: 'Dev' },
  ];

  if (!mounted || currentPath === null) {
    return null; // or a loading spinner
  }

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-[#FBFCFD]">
      <div className="flex items-center">
        <Link href="/" passHref>
          <span className="flex items-center cursor-pointer">
            <span className="ml-2 text-lg font-bold text-[#333B40]">LOGO</span>
          </span>
        </Link>
        <ul className="flex gap-8 ml-8 font-medium text-[#5A666E]">
          <li>
            <Link href="/features" passHref>
              <span className="cursor-pointer">Features</span>
            </Link>
          </li>
          <li>
            <Link href="/pricing" passHref>
              <span className="cursor-pointer">Pricing</span>
            </Link>
          </li>
          <li>
            <Link href="/testimonials" passHref>
              <span className="cursor-pointer">Testimonials</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/signup" passHref>
          <span className="cursor-pointer text-blue-600">Sign Up</span>
        </Link>
        <Link href="/login" passHref>
          <button className="py-2 px-6 bg-blue-600 text-white rounded-full">
            Log In
          </button>
        </Link>
      </div>
    </nav>
  );
};
