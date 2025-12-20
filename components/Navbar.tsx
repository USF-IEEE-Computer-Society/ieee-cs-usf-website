import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'IEEE', path: '/ieee' },
    { name: 'TechX', path: '/techx' },
    { name: 'People', path: '/people' },
    { name: 'Events', path: '/events' },
  ];

  return (
    <nav className="fixed top-2 left-1/2 -translate-x-1/2 w-[85%] max-w-7xl bg-ieeeOrange/60 backdrop-blur-md rounded-xl border border-gray-200 z-50 px-6 py-3 flex justify-between items-center">
      <div className="flex items-center">
        <Image 
            src="/ieee_cs_usf_logo_white.png" 
            alt="IEEE-CS Logo" 
            width={120} 
            height={40} 
        /></div>
      <div className="space-x-6">
        {navLinks.map((link) => (
          <Link 
            key={link.path} 
            href={link.path} 
            className="hover:text-blue-500 transition-colors font-medium"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;