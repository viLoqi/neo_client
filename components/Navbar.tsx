import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavLink {
  id: string;
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

  const navLinks: NavLink[] = [
    { id: 'features', label: 'Features' },
    { id: 'pricing-plan', label: 'Pricing' },
    // { id: 'testimonials', label: 'Testimonials' },
    { id: 'get-started', label: 'Get Started' },
  ];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted || currentPath === null) {
    return null;
  }

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-[#FBFCFD]">
      <div className="flex items-center">
        <Link className="hidden md:flex " href="/" passHref>
          <span className="flex items-center cursor-pointer">
            <Image
              src={'/loqi.png'}
              alt="logo"
              width={60}
              height={60}
            />
          </span>
        </Link>
        <ul className="flex gap-8 md:ml-8 font-medium text-[#5A666E]">
          {navLinks.map((link) => (
            <li key={link.id} className="relative group">
              <span
                onClick={() => scrollToSection(link.id)}
                className="cursor-pointer"
              >
                {link.label}
              </span>
              <span
                className={`absolute left-0 bottom-0 h-0.5 w-full bg-blue-600 transition-all duration-300 scale-x-0 group-hover:scale-x-100 origin-left ${
                  currentPath === `#${link.id}` ? 'scale-x-100' : ''
                }`}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/login" passHref>
          <button className="py-2 px-6 bg-blue-600 text-white rounded-full transition transform duration-300 hover:bg-blue-700 hover:shadow-lg hover:scale-105">
            Log In
          </button>
        </Link>
      </div>
    </nav>
  );
};
