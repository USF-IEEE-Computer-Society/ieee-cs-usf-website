import { Linkedin } from 'lucide-react';
import Image from 'next/image';

interface MemberProps {
  role: string;
  name: string;
  major: string;
  year: string;
  linkedin: string;
  imageUrl: string;
}

export default function MemberCard({ role, name, major, year, linkedin, imageUrl }: MemberProps) {
  return (
    <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-transform duration-700 border border-gray-100 dark:border-gray-700">
      <div className="relative size-37 md:size-40 mb-4 overflow-hidden rounded-xl border-2 border-ieeeBlue">
        <Image 
          src={imageUrl} 
          alt={name} 
          fill 
          className="object-cover"
        />
      </div>
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{name}</h3>
      <p className="text-sm font-medium text-ieeeDark mb-1">{role}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{major}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{year}</p>
      <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-ieeeBlue hover:text-blue-900 dark:hover:text-blue-300">
        <Linkedin size={20} />
      </a>
    </div>
  );
}