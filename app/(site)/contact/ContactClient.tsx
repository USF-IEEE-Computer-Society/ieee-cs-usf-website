// FIX ME : add backend, verify email, better design

"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { Briefcase, GraduationCap, Building2, Users2, School } from 'lucide-react';

declare global {
  interface Window {
    turnstile: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
          size?: 'normal' | 'compact';
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

const contactRoles = [
  {
    id: 'pro',
    label: 'Professional',
    icon: <Briefcase />,
    text: "Want to give a talk or mentor students? We handle the logistics and marketing for our Mentorship Program and Tech Talks!"
  },
  {
    id: 'student',
    label: 'Student',
    icon: <GraduationCap />,
    text: "Have event ideas or want to volunteer? We document all your volunteering hours!"
  },
  {
    id: 'company',
    label: 'Company',
    icon: <Building2 />,
    text: "Looking for campus outreach? We've hosted Verizon, JP Morgan Chase, Cisco, and more."
  },
  {
    id: 'org',
    label: 'Organization',
    icon: <Users2 />,
    text: "Tech community or student org? Let's collaborate like we did with Tampa Devs or ACM!"
  },
  {
    id: 'staff',
    label: 'USF Staff',
    icon: <School />,
    text: "Professor or Staff? We have collaborated across departments, including the College of Engineering and the Bellini College of AI, Cybersecurity, and Computing!"
  }
];

export default function ContactClient() {
  const [activeRole, setActiveRole] = useState(contactRoles[0]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  const renderTurnstile = useCallback(() => {
    if (
      turnstileContainerRef.current &&
      window.turnstile &&
      !turnstileWidgetId.current
    ) {
      turnstileWidgetId.current = window.turnstile.render(
        turnstileContainerRef.current,
        {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
          callback: (token: string) => {
            setTurnstileToken(token);
          },
          'expired-callback': () => {
            setTurnstileToken(null);
          },
          'error-callback': () => {
            setTurnstileToken(null);
          },
          theme: 'light',
        }
      );
    }
  }, []);

  useEffect(() => {
    // Check if Turnstile script is already loaded
    if (window.turnstile) {
      renderTurnstile();
      return;
    }

    // Set up callback for when script loads
    window.onTurnstileLoad = () => {
      renderTurnstile();
    };

    // Load Turnstile script with explicit rendering
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup widget on unmount
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
      // Clean up global callback
      delete window.onTurnstileLoad;
    };
  }, [renderTurnstile]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!turnstileToken) {
      setStatus('error');
      return;
    }

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      role: activeRole.label,
      turnstileToken,
    };

    const res = await fetch('/api/send', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setStatus('success');
      (e.target as HTMLFormElement).reset();
      // Reset Turnstile for next submission
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.reset(turnstileWidgetId.current);
        setTurnstileToken(null);
      }
    } else {
      setStatus('error');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen pt-16 pb-12 px-8 bg-white text-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-600 mb-12 text-lg">Select who you are so we can help you better.</p>

        {/* Role Selection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {contactRoles.map((role) => (
            <button
              key={role.id}
              onClick={() => setActiveRole(role)}
              className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                activeRole.id === role.id 
                ? 'border-ieeeDark bg-orange-50 text-ieeeDark' 
                : 'border-gray-100 hover:border-orange-200 text-ieeeCoolGray'
              }`}
            >
              <div className="mb-2">{role.icon}</div>
              <span className="text-xs font-bold uppercase tracking-wider">{role.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Content Box */}
        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-xl font-bold mb-2">For {activeRole.label}s:</h2>
          <p className="text-gray-700 leading-relaxed">{activeRole.text}</p>
        </div>

        {/* The Form */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-gray-200 p-8 rounded-2xl shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2">Full Name</label>
              <input 
                name="name"
                required
                type="text" 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Email Address</label>
              <input
                name="email"
                required
                type="email"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="john@usf.edu"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Message</label>
            <textarea
              name="message"
              required
              rows={4}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder={`Hi IEEE Computer Society at USF! I am a ${activeRole.label.toLowerCase()} and I'd like to...`}
            ></textarea>
          </div>

          {/* Cloudflare Turnstile Widget */}
          <div className="flex justify-center">
            <div ref={turnstileContainerRef} />
          </div>

          <button
            type="submit"
            disabled={loading || !turnstileToken}
            className={`w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 ${loading || !turnstileToken ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>

          {/* Status Messages */}
          {status === 'success' && (
            <p className="text-green-600 text-center font-bold animate-pulse">
              Message sent successfully!
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-600 text-center font-bold">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
