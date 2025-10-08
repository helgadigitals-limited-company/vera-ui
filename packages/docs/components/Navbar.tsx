

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button, ThemeToggle } from '@helgadigitals/vera-ui';
import { Search, Menu, Github, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { useSearchContext } from 'fumadocs-ui/provider';
import veralogo from '@/public/vera.png';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setOpenSearch } = useSearchContext();

  const navigationItems = [
    { href: '/docs', label: 'Documentation' },
    { href: '/docs/components', label: 'Components' },
    { href: '/docs/examples', label: 'Examples' },
    { href: '/docs/contributing', label: 'Contributing' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Image 
              src={veralogo} 
              alt="Vera UI Logo" 
              width={32} 
              height={32}
              className="rounded-md"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
              Vera UI
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Search Button */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:flex items-center space-x-2 text-muted-foreground hover:text-foreground w-64 justify-start"
            onClick={() => setOpenSearch(true)}
          >
            <Search className="size-4" />
            <span className="text-sm">Search documentation...</span>
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>

          {/* Mobile Search */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="sm:hidden"
            onClick={() => setOpenSearch(true)}
          >
            <Search className="size-4" />
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle className="hidden sm:flex" />

          {/* GitHub Link */}
          <Button variant="ghost" size="sm" asChild>
            <Link 
              href="https://github.com/helgadigitals-limited-company/vera-ui" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1"
            >
              <Github className="size-4" />
              <ExternalLink className="size-3" />
            </Link>
          </Button>

          

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="size-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="container py-4 px-4">
            <div className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Theme Toggle */}
              <div className="flex items-center justify-between py-2 border-t border-border pt-4">
                <span className="text-sm font-medium text-foreground">Theme</span>
                <ThemeToggle />
              </div>
              
              
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
