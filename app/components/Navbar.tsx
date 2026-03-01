'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <div
        className={`relative flex w-full max-w-[1400px] items-center justify-between rounded-2xl px-6 py-4 transition-all duration-500 ${
          scrolled
            ? 'bg-surface/80 dark:bg-surface/80 shadow-lg shadow-black/5 dark:shadow-black/30 backdrop-blur-xl border border-borderColor'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="relative z-10 shrink-0">
          <Image
            src="/ieee_cs_usf_logo_white.png"
            alt="IEEE-CS Logo"
            width={110}
            height={36}
            className="hidden dark:block"
          />
          <Image
            src="/ieee_cs_usf_logo_black.png"
            alt="IEEE-CS Logo"
            width={110}
            height={36}
            className="block dark:hidden"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`nav-link px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
                pathname === link.path
                  ? 'text-ieeeOrange'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="ml-3 pl-3 border-l border-borderStrong">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/"
            className={`px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors ${
              pathname === '/' ? 'text-ieeeOrange' : 'text-foreground/70 hover:text-foreground'
            }`}
          >
            Home
          </Link>
          <ThemeToggle />
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-xl text-foreground/70 hover:text-foreground hover:bg-surfaceAlt transition-all duration-200"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`absolute md:hidden top-full right-0 left-0 mt-2 mx-2 bg-surface/95 dark:bg-surface/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/40 border border-borderColor overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          <div className="flex flex-col py-2">
            {mobileMenuLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={closeMobileMenu}
                className={`px-6 py-3.5 text-sm font-medium uppercase tracking-wide transition-colors ${
                  pathname === link.path
                    ? 'text-ieeeOrange bg-glowOrange'
                    : 'text-foreground/70 hover:text-foreground hover:bg-surfaceAlt'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
