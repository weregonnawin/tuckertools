"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Brands", href: "#brands" },
  { label: "Categories", href: "#categories" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand-black/95 backdrop-blur-md shadow-lg shadow-black/40"
          : "bg-brand-black"
      }`}
    >
      {/* Top accent line */}
      <div className="h-[3px] bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-red" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative">
              <svg
                viewBox="0 0 32 32"
                fill="currentColor"
                className="w-8 h-8 sm:w-9 sm:h-9 text-brand-yellow transition-transform duration-300 group-hover:rotate-[15deg]"
                aria-hidden="true"
              >
                {/* Power drill / impact driver silhouette */}
                {/* Chuck / bit tip */}
                <rect x="1" y="12" width="5" height="4" rx="0.5" />
                {/* Chuck collar */}
                <rect x="5" y="11" width="3" height="6" rx="0.5" />
                {/* Main drill body */}
                <rect x="8" y="10" width="13" height="8" rx="1.5" />
                {/* Top vent detail */}
                <rect x="10" y="10" width="9" height="2" rx="0.5" opacity="0.5" />
                {/* Trigger */}
                <path d="M16 18 L15 24 L18 24 L19 18 Z" />
                {/* Handle body */}
                <rect x="13" y="18" width="8" height="8" rx="2" />
                {/* Battery pack */}
                <rect x="12" y="26" width="10" height="4" rx="1.5" />
                {/* Battery terminal nubs */}
                <rect x="14" y="25" width="2" height="2" rx="0.5" />
                <rect x="18" y="25" width="2" height="2" rx="0.5" />
                {/* Speed selector ring on body */}
                <rect x="19" y="12" width="2" height="4" rx="1" opacity="0.6" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg sm:text-xl font-black tracking-wider text-white uppercase">
                Tucker
              </span>
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-brand-yellow uppercase">
                Tools
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative px-4 py-2 text-sm font-semibold uppercase tracking-wider text-gray-300 hover:text-white transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-yellow transition-all duration-300 group-hover:w-3/4" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA + mobile toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-brand-yellow hover:bg-brand-yellow-dark text-brand-black font-bold text-sm uppercase tracking-wider transition-all duration-200 btn-industrial"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Request Quote
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 group"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span
                className={`block w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
                  mobileOpen ? "rotate-45 translate-y-[5px]" : ""
                }`}
              />
              <span
                className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
                  mobileOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
                  mobileOpen ? "-rotate-45 -translate-y-[5px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="h-px bg-brand-yellow/20" />

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-brand-dark border-t border-brand-steel/20 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-sm font-semibold uppercase tracking-wider text-gray-300 hover:text-white hover:bg-brand-charcoal/50 border-l-2 border-transparent hover:border-brand-yellow transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 px-4">
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-brand-yellow hover:bg-brand-yellow-dark text-brand-black font-bold text-sm uppercase tracking-wider transition-colors duration-200"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Request Quote
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
