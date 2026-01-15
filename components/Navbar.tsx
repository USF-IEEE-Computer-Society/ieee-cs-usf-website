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
    <nav className="w-full flex justify-center items-center text-white">
      <div className="flex flex-row w-[80%] max-w-[1600px] justify-between items-center p-6 mt-3 mb-3 bg-ieeeBlue rounded-xl">
      <div className="">
        <Link href="/">
          <Image 
              src="/ieee_cs_usf_logo_white.png" 
              alt="IEEE-CS Logo" 
              width={120} 
              height={40} 
          />
        </Link>
      </div>
      <div className="flex flex-row gap-6 items-center">
        {navLinks.map((link) => (
          <Link 
            key={link.path} 
            href={link.path} 
            className="hover:text-ieeeOrange transition-colors duration-100 font-medium text-lg"
          >
            {link.name}
          </Link>
        ))}
      </div>

      </div>

    </nav>
  );
};

export default Navbar;