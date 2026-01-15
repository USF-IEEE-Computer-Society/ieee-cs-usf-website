import Link from 'next/link';
import Image from 'next/image';

interface NavLink {
  name: string;
  path: string;
  mobileVisible: boolean;
}

const navLinks: NavLink[] = [
  { name: 'Home', path: '/', mobileVisible: true },
  { name: 'About', path: '/about', mobileVisible: false },
  { name: 'IEEE', path: '/ieee', mobileVisible: false },
  { name: 'TechX', path: '/techx', mobileVisible: false },
  { name: 'People', path: '/people', mobileVisible: true },
  { name: 'Events', path: '/events', mobileVisible: true },
];

const Navbar = () => {
  return (
    <nav className="w-full flex justify-center items-center text-white">
      <div className="flex flex-row w-[95%] md:w-[80%] max-w-[1600px] justify-between items-center p-6 mt-3 mb-3 bg-ieeeBlue rounded-xl">
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
        <div className="flex flex-row gap-4 md:gap-6 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path} 
              className={`hover:text-ieeeOrange transition-colors duration-100 font-medium text-base md:text-lg ${
                link.mobileVisible ? '' : 'hidden md:block'
              }`}
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