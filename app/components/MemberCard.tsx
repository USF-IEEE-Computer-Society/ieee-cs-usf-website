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
    <div className="group glass-card p-5 flex flex-col items-center text-center">
      <div className="relative size-32 md:size-36 mb-4 overflow-hidden rounded-2xl ring-2 ring-borderStrong group-hover:ring-ieeeOrange/50 transition-all duration-500">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <h3 className="font-display text-base font-bold text-foreground">{name}</h3>
      <p className="text-sm font-semibold text-ieeeOrange mt-0.5">{role}</p>
      <p className="text-xs text-muted mt-1">{major}</p>
      <p className="text-xs text-muted mb-3">{year}</p>

      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg hover:bg-ieeeBlue/10 text-ieeeBlue hover:text-ieeeBlue transition-all duration-200"
      >
        <Linkedin size={18} />
      </a>
    </div>
  );
}
