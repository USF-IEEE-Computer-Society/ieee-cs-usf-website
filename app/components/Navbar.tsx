'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface NavLink {
  name: string;
  path: string;
}

const navLinks: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'People', path: '/people' },
  { name: 'Events', path: '/events' },
  { name: 'News', path: '/news' },
  { name: 'Partners', path: '/partners' },
  { name: 'Contact', path: '/contact' },
];

const mobileMenuLinks: NavLink[] = [
  { name: 'People', path: '/people' },
  { name: 'Events', path: '/events' },
  { name: 'News', path: '/news' },
  { name: 'Partners', path: '/partners' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="w-full flex justify-center items-center text-white">
      <div className="relative flex flex-row w-[95%] md:w-[80%] max-w-[1600px] justify-between items-center p-6 mt-3 mb-3 bg-ieeeBlue rounded-xl">
        {/* Logo */}
        <div>
          <Link href="/">
            <Image 
              src="/ieee_cs_usf_logo_white.png" 
              alt="IEEE-CS Logo" 
              width={120} 
              height={40} 
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-row gap-4 items-center">
          {navLinks.map((link) => (
            <div key={link.path} className="p-3 rounded-lg">
              <Link 
                href={link.path} 
                className="hover:text-ieeeOrange hover:underline transition-colors duration-100 font-medium text-lg"
              >
                {link.name}
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden flex-row gap-2 items-center">
          {/* Home Button */}
          <Link 
            href="/" 
            className={`p-3 rounded-lg hover:underline transition-colors duration-100 font-medium text-base ${
              pathname === '/' ? 'text-ieeeOrange' : 'hover:text-ieeeOrange'
            }`}
          >
            Home
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={toggleMobileMenu}
            className="p-3 rounded-lg hover:bg-white/10 transition-colors duration-100"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="absolute md:hidden top-full right-0 mt-2 mr-4 bg-ieeeBlue rounded-xl shadow-lg z-50">
            <div className="flex flex-col py-2">
              {mobileMenuLinks.map((link, index) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={closeMobileMenu}
                  className={`px-6 py-3 text-right hover:bg-white/10 transition-colors duration-100 font-medium text-base whitespace-nowrap ${
                    pathname === link.path ? 'text-ieeeOrange' : 'hover:text-ieeeOrange'
                  } ${index < mobileMenuLinks.length - 1 ? 'border-b border-white/30' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;