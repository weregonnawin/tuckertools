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
                fill="none"
                className="w-8 h-8 sm:w-9 sm:h-9 text-brand-yellow transition-transform duration-300 group-hover:rotate-[15deg]"
                aria-hidden="true"
              >
                {/* Wrench icon */}
                <path
                  d="M25.5 6.5a7 7 0 0 0-9.4.9L12 11.5l-3-3-1.5 1.5L10 12.5l-5.5 5.5a3 3 0 0 0 0 4.2l1.3 1.3a3 3 0 0 0 4.2 0L15.5 18l2.5 2.5 1.5-1.5-2.5-2.5 4.1-4.1a7 7 0 0 0 .9-9.4l-3.5 3.5-2.5-2.5 3.5-3.5Z"
                  fill="currentColor"
                />
                {/* Gear teeth */}
                <path
                  d="M27 14.5V17h-2.2a7.1 7.1 0 0 1-.8 1.9l1.6 1.6-1.8 1.8-1.6-1.6a7.1 7.1 0 0 1-1.9.8V24h-2.5v-2.5a7.1 7.1 0 0 1-1.9-.8l-1.6 1.6-1.8-1.8 1.6-1.6"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                  opacity="0.35"
                />
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
