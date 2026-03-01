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
    pluralLabel: 'Professionals',
    icon: <Briefcase size={20} strokeWidth={1.5} />,
    text: "Want to give a talk or mentor students? We handle the organization and marketing!"
  },
  {
    id: 'company',
    label: 'Company',
    pluralLabel: 'Companies',
    icon: <Building2 size={20} strokeWidth={1.5} />,
    text: "Looking for campus outreach? In the past we've hosted Verizon, JP Morgan Chase, Cisco, and more."
  },
  {
    id: 'org',
    label: 'Organization',
    pluralLabel: 'Organizations',
    icon: <Users2 size={20} strokeWidth={1.5} />,
    text: "Tech community or student org? Let's collaborate like we did with Tampa Devs or Google Developers Group!"
  },
  {
    id: 'student',
    label: 'Student',
    pluralLabel: 'Students',
    icon: <GraduationCap size={20} strokeWidth={1.5} />,
    text: "Have event ideas, want to volunteer or join our eboard? Contact us."
  },
  {
    id: 'staff',
    label: 'USF Staff',
    pluralLabel: 'USF Staff',
    icon: <School size={20} strokeWidth={1.5} />,
    text: "Professor or Staff? We have collaborated across departments, including the College of Engineering and the Bellini College of AI."
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
          theme: 'auto',
        }
      );
    }
  }, []);

  useEffect(() => {
    if (window.turnstile) {
      renderTurnstile();
      return;
    }

    window.onTurnstileLoad = () => {
      renderTurnstile();
    };

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
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
    <main className="min-h-screen pt-28 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-14">
          <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-ieeeOrange mb-2 block">
            Get in Touch
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
            Contact Us
          </h1>
          <p className="text-muted text-lg">Select who you are so we can help you better.</p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
          {contactRoles.map((role) => (
            <button
              key={role.id}
              onClick={() => setActiveRole(role)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300 ${
                activeRole.id === role.id
                  ? 'border-ieeeOrange bg-ieeeOrange/10 text-ieeeOrange'
                  : 'border-borderColor bg-surface text-muted hover:border-ieeeOrange/30 hover:text-foreground'
              }`}
            >
              <div>{role.icon}</div>
              <span className="font-display text-xs font-bold uppercase tracking-wider">{role.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Content */}
        <div className="glass-card p-7 mb-10 hover:transform-none">
          <h2 className="font-display text-lg font-bold text-foreground mb-2">
            For {activeRole.pluralLabel}:
          </h2>
          <p className="text-mutedStrong leading-relaxed">{activeRole.text}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6 hover:transform-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-display text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                Full Name
              </label>
              <input
                name="name"
                required
                type="text"
                className="w-full p-3.5 bg-surfaceAlt border border-borderColor rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ieeeOrange/40 focus:border-ieeeOrange/40 transition-all"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block font-display text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                Email Address
              </label>
              <input
                name="email"
                required
                type="email"
                className="w-full p-3.5 bg-surfaceAlt border border-borderColor rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ieeeOrange/40 focus:border-ieeeOrange/40 transition-all"
                placeholder="john@usf.edu"
              />
            </div>
          </div>
          <div>
            <label className="block font-display text-xs font-bold uppercase tracking-wider text-foreground mb-2">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={4}
              className="w-full p-3.5 bg-surfaceAlt border border-borderColor rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ieeeOrange/40 focus:border-ieeeOrange/40 transition-all resize-none"
              placeholder={`Hi IEEE Computer Society at USF! I am a ${activeRole.label.toLowerCase()} and I'd like to...`}
            />
          </div>

          <div className="flex justify-center">
            <div ref={turnstileContainerRef} />
          </div>

          <button
            type="submit"
            disabled={loading || !turnstileToken}
            className={`w-full py-4 font-display text-sm font-bold uppercase tracking-wider rounded-xl bg-ieeeOrange text-ieeeDarkblue hover:bg-ieeeDark transition-all duration-300 ${
              loading || !turnstileToken ? 'opacity-40 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-ieeeOrange/20 hover:-translate-y-0.5'
            }`}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <div className="text-center p-4 rounded-xl bg-green-500/10 border border-green-500/30">
              <p className="text-green-600 dark:text-green-400 font-bold text-sm">
                Message sent successfully!
              </p>
            </div>
          )}
          {status === 'error' && (
            <div className="text-center p-4 rounded-xl bg-red-500/10 border border-red-500/30">
              <p className="text-red-600 dark:text-red-400 font-bold text-sm">
                Something went wrong. Please try again.
              </p>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
