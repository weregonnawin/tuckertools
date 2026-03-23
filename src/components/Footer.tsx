const brandLinks = [
  { label: "Milwaukee", href: "#brands" },
  { label: "DeWalt", href: "#brands" },
  { label: "Makita", href: "#brands" },
  { label: "Bosch", href: "#brands" },
  { label: "Ryobi", href: "#brands" },
  { label: "Ridgid", href: "#brands" },
];

const categoryLinks = [
  { label: "Drills & Drivers", href: "#categories" },
  { label: "Saws", href: "#categories" },
  { label: "Grinders", href: "#categories" },
  { label: "Impact Wrenches", href: "#categories" },
  { label: "Sanders", href: "#categories" },
  { label: "Rotary Hammers", href: "#categories" },
];

const companyLinks = [
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Request a Quote", href: "#contact" },
  { label: "Shipping Policy", href: "/shipping" },
  { label: "Returns", href: "/returns" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-brand-steel/20">
      {/* Top accent */}
      <div className="h-1 bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-red" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="/" className="inline-flex items-center gap-2.5 mb-5">
              <svg
                viewBox="0 0 32 32"
                fill="currentColor"
                className="w-8 h-8 text-brand-yellow"
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
              <div className="flex flex-col leading-none">
                <span className="text-lg font-black tracking-wider text-white uppercase">
                  Tucker
                </span>
                <span className="text-[10px] font-bold tracking-[0.25em] text-brand-yellow uppercase">
                  Tools
                </span>
              </div>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              Your trusted source for professional-grade power tools and
              equipment. Authorized dealer for the industry&apos;s most
              reliable brands.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              <a
                href="mailto:support@tuckertools.com"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-brand-yellow transition-colors"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-brand-yellow/60 flex-shrink-0" aria-hidden="true">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                support@tuckertools.com
              </a>
              <a
                href="tel:+18005551234"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-brand-yellow transition-colors"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-brand-yellow/60 flex-shrink-0" aria-hidden="true">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                1-800-555-1234
              </a>
            </div>

          </div>

          {/* Brands column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-5 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-brand-yellow" />
              Brands
            </h3>
            <ul className="space-y-2.5">
              {brandLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-brand-yellow transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-5 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-brand-yellow" />
              Categories
            </h3>
            <ul className="space-y-2.5">
              {categoryLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-brand-yellow transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-5 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-brand-yellow" />
              Company
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-brand-yellow transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-steel/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            &copy; 2026 Tucker Tools. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <a href="/terms" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </a>
            <a href="/privacy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </a>
            <a href="/shipping" className="hover:text-gray-300 transition-colors">
              Shipping
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
