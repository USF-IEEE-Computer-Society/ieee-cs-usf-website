import Image from "next/image"
import Link from "next/link"
import { InstagramIcon, LinkedInIcon, LinktreeIcon } from "./icons/SocialIcons"

const footerLinks = [
  { name: 'Home', path: '/' },
  { name: 'People', path: '/people' },
  { name: 'Events', path: '/events' },
  { name: 'News', path: '/news' },
  { name: 'Partners', path: '/partners' },
  { name: 'Contact', path: '/contact' },
]

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden">
      {/* Circuit dots background */}
      <div className="absolute inset-0 circuit-dots" />

      <div className="relative bg-ieeeDarkblue/95 dark:bg-surface/95 border-t border-borderStrong">
        <div className="max-w-[1400px] mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Brand */}
            <div className="flex flex-col gap-5">
              <Image
                src="/ieee_cs_usf_logo_white.png"
                alt="IEEE-CS-USF Logo"
                width={140}
                height={40}
              />
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                IEEE Computer Society Student Branch Chapter at the University of South Florida, Tampa.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-ieeeOrange mb-5">
                Navigation
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {footerLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className="text-white/60 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-ieeeOrange mb-5">
                Connect
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/ieeecs_usf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-ieeeOrange/20 border border-white/10 hover:border-ieeeOrange/40 transition-all duration-300"
                >
                  <InstagramIcon color="#ffffff" />
                </a>
                <a
                  href="https://www.linkedin.com/company/ieee-cs-at-usf/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-ieeeOrange/20 border border-white/10 hover:border-ieeeOrange/40 transition-all duration-300"
                >
                  <LinkedInIcon color="#ffffff" />
                </a>
                <a
                  href="https://linktr.ee/ieeecsusf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-ieeeOrange/20 border border-white/10 hover:border-ieeeOrange/40 transition-all duration-300"
                >
                  <LinktreeIcon color="#ffffff" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-white/40 text-xs">
              &copy; 2026 IEEE Computer Society at USF. All rights reserved.
            </p>
            <p className="text-white/30 text-xs">
              No commercial use without permission.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
