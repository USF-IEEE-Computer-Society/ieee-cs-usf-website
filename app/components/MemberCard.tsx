import { Linkedin } from 'lucide-react';
import Image from 'next/image';
import { hasFlag } from 'country-flag-icons';
import * as FlagIcons from 'country-flag-icons/react/3x2';

interface MemberProps {
  role: string;
  name: string;
  major: string;
  year: string;
  linkedin: string;
  imageUrl: string;
  country?: string;
}

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

export default function MemberCard({ role, name, major, year, linkedin, imageUrl, country }: MemberProps) {
  const countryCode = country?.toUpperCase();
  const FlagComponent = countryCode && hasFlag(countryCode) ? (FlagIcons as Record<string, React.ComponentType<{ title?: string; className?: string }>>)[countryCode] : null;
  const countryName = countryCode ? regionNames.of(countryCode) ?? countryCode : '';

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
      <div className="flex flex-col items-center justify-center gap-3 w-full md:flex-row md:gap-2">
        {FlagComponent && countryName && (
          <span
            className="shrink-0 inline-block w-5 rounded-sm"
            role="img"
            aria-label={countryName}
            title={countryName}
          >
            <FlagComponent className="w-5 h-auto block" title={countryName} />
          </span>
        )}
        <h3 className="text-lg font-bold text-gray-800 text-center md:text-left">{name}</h3>
      </div>
      <p className="text-sm font-medium text-ieeeDark mb-1 text-center md:text-left">{role}</p>
      <p className="text-xs text-gray-500 text-center md:text-left">{major}</p>
      <p className="text-xs text-gray-500 mb-3 text-center md:text-left">{year}</p>
      <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-ieeeBlue hover:text-blue-900">
        <Linkedin size={20} />
      </a>
    </div>
  );
}