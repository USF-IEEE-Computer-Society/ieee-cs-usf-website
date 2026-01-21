'use client';

import { useState } from 'react';
import { Link2, Linkedin } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const articleUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/news/${slug}`
    : `/news/${slug}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;

  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-500 font-medium">Share:</span>
      
      <button
        onClick={handleCopyLink}
        className="inline-flex items-center gap-2 px-4 py-2 bg-ieeeDark text-white rounded-md hover:bg-ieeeDark/90 transition-colors text-sm font-medium"
      >
        <Link2 size={16} />
        {copied ? 'Copied!' : 'Copy Link'}
      </button>

      <a
        href={linkedInShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-[#0e76a8] text-white rounded-md hover:bg-[#0e76a8]/90 transition-colors text-sm font-medium"
      >
        <Linkedin size={16} />
        LinkedIn
      </a>
    </div>
  );
}
