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
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-2 transition-transform transition-shadow duration-700 border border-gray-100">
      <div className="relative w-40 h-40 mb-4 overflow-hidden rounded-xl border-2 border-ieeeBlue">
        <Image 
          src={imageUrl} 
          alt={name} 
          fill 
          className="object-cover"
        />
      </div>
      <h3 className="text-lg font-bold text-gray-800">{name}</h3>
      <p className="text-sm font-medium text-ieeeDark mb-1">{role}</p>
      <p className="text-xs text-gray-500">{major}</p>
      <p className="text-xs text-gray-500 mb-3">{year}</p>
      <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-ieeeBlue hover:text-blue-900">
        <Linkedin size={20} />
      </a>
    </div>
  );
}