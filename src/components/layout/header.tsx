'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#events', label: 'Events' },
  { href: '#societies', label: 'Societies' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#publications', label: 'Publications' },
  { href: '#news', label: 'News' },
  { href: '#office-bearers', label: 'Office Bearers' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-background/80 backdrop-blur-lg border-b' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex-1">
            <Link href="/" className="flex items-center font-bold text-xl text-primary">
                SMVITM-IEEE
            </Link>
        </div>

        <div className="flex-1 flex justify-center">
            <svg
              className="h-16 w-auto"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
                </linearGradient>
                 <path id="curve" d="M 25 60 A 30 30 0 0 1 75 60" />
              </defs>
              <path
                fill="url(#logo-gradient)"
                d="M50,5 A45,45 0 1,0 50,95 A45,45 0 1,0 50,5 Z M50,15 A35,35 0 1,1 50,85 A35,35 0 1,1 50,15 Z"
              />
              <text
                fontFamily="Inter, sans-serif"
                fontSize="20"
                fontWeight="bold"
                fill="blue"
                textAnchor="middle"
                style={{ mixBlendMode: 'screen' }}
              >
                <textPath href="#curve" startOffset="50%">
                    SMVITM
                </textPath>
              </text>
              <text
                x="50"
                y="75"
                fontFamily="Inter, sans-serif"
                fontSize="12"
                fontWeight="bold"
                fill="hsl(var(--primary-foreground))"
                textAnchor="middle"
                style={{ mixBlendMode: 'screen' }}
              >
                IEEE
              </text>
            </svg>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
           <Button asChild variant="outline" size="sm">
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-background border-t">
          <nav className="flex flex-col items-center gap-4 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/80 hover:text-primary transition-colors text-lg"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
