import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Tucker Tools",
  description:
    "Tucker Tools Privacy Policy. Learn how we collect, use, and protect your personal information when you visit our website or request a quote.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="bg-brand-black min-h-screen pt-16 sm:pt-20">
        {/* Page header */}
        <div className="border-b border-brand-steel/20 bg-brand-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs text-gray-500 mb-4" aria-label="Breadcrumb">
              <a href="/" className="hover:text-brand-yellow transition-colors">Home</a>
              <span>/</span>
              <span className="text-gray-300">Privacy Policy</span>
            </nav>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[3px] bg-brand-yellow" />
              <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow">Legal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wide text-white">
              Privacy Policy
            </h1>
            <p className="text-gray-500 text-sm mt-3">Last updated: March 2026</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="space-y-12">

            {/* Introduction */}
            <section>
              <p className="text-gray-400 leading-relaxed">
                Tucker Tools (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website at tuckertools.com or interact with us to request quotes or purchase products. By using our website, you agree to the practices described in this policy.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-3">
                <span className="w-5 h-[2px] bg-brand-yellow flex-shrink-0" />
                Information We Collect
              </h2>
              <p className="text-gray-400 leading-relaxed mb-5">
                We collect information you provide directly to us and information gathered automatically when you use our website.
              </p>
              <div className="space-y-5">
                <div>
                  <h3 className="text-base font-bold text-white mb-2">Information You Provide</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                      <strong className="text-white">Name</strong> — to address you properly and process your order or quote request
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                      <strong className="text-white">Email address</strong> — to send order confirmations, shipping updates, and respond to inquiries
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                      <strong className="text-white">Phone number</strong> — to follow up on quotes or orders when needed
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                      <strong className="text-white">Company name</strong> — for business customers requesting commercial quotes
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                      <strong className="text-white">Shipping address</strong> — to fulfill and deliver your order
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                      <strong className="text-white">Payment information</strong> — processed securely through our payment processor; we do not store full card details
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-2">Information Collected Automatically</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                      Browser type, IP address, and device information
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                      Pages visited, time on site, and navigation paths
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                      Referring website or search query that brought you to our site
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use It */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-3">
                <span className="w-5 h-[2px] bg-brand-yellow flex-shrink-0" />
                How We Use Your Information
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Tucker Tools uses the information we collect to:
              </p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                  Process and fulfill orders, including shipping and delivery
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                  Respond to quote requests, inquiries, and customer support issues
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                  Send transactional communications such as order confirmations and shipping notifications
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                  Send promotional emails or product updates (you may opt out at any time)
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                  Improve our website, product catalog, and customer experience
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                  Comply with legal obligations and resolve disputes
                </li>
              </ul>
            </section>

            {/* No Selling Data */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-3">
                <span className="w-5 h-[2px] bg-brand-yellow flex-shrink-0" />
                We Do Not Sell Your Data
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Tucker Tools does <strong className="text-white">not sell, rent, or trade your personal information</strong> to third parties for their marketing purposes. We may share your information with trusted service providers who assist us in operating our website and fulfilling orders (such as shipping carriers and payment processors), but only under strict confidentiality obligations and solely as needed to provide those services.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-3">
                <span className="w-5 h-[2px] bg-brand-yellow flex-shrink-0" />
                Cookies &amp; Tracking
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Our website uses cookies and similar tracking technologies to enhance your browsing experience and gather analytics data. Cookies are small text files stored on your device that help us recognize returning visitors and understand how people use our site.
              </p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                  <strong className="text-white">Essential cookies</strong> — required for the website to function (e.g., shopping cart, session management)
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                  <strong className="text-white">Analytics cookies</strong> — help us understand page traffic and user behavior (e.g., Google Analytics)
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                  <strong className="text-white">Preference cookies</strong> — remember your settings and preferences
                </li>
              </ul>
              <p className="text-gray-400 text-sm mt-4">
                You can control or disable cookies through your browser settings. Note that disabling essential cookies may affect site functionality.
              </p>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-3">
                <span className="w-5 h-[2px] bg-brand-yellow flex-shrink-0" />
                Data Security
              </h2>
              <p className="text-gray-400 leading-relaxed">
                We take reasonable technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data transmitted through our website is encrypted via SSL/TLS. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-3">
                <span className="w-5 h-[2px] bg-brand-yellow flex-shrink-0" />
                Your Rights
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                  Request access to the personal information we hold about you
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                  Request correction of inaccurate information
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                  Request deletion of your data (subject to legal retention requirements)
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                  Opt out of marketing communications at any time via the unsubscribe link in any email
                </li>
              </ul>
              <p className="text-gray-400 text-sm mt-4">
                To exercise any of these rights, email us at{" "}
                <a href="mailto:support@tuckertools.com" className="text-brand-yellow hover:underline">
                  support@tuckertools.com
                </a>.
              </p>
            </section>

            {/* Changes */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-3">
                <span className="w-5 h-[2px] bg-brand-yellow flex-shrink-0" />
                Changes to This Policy
              </h2>
              <p className="text-gray-400 leading-relaxed">
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. The &ldquo;Last updated&rdquo; date at the top of this page indicates when the most recent revision was made. Continued use of our website after changes are posted constitutes your acceptance of the updated policy.
              </p>
            </section>

            {/* Contact */}
            <section className="border-t border-brand-steel/20 pt-10">
              <h2 className="text-base font-bold uppercase tracking-wide text-white mb-3">Contact Us</h2>
              <p className="text-gray-400 text-sm">
                If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us at{" "}
                <a href="mailto:support@tuckertools.com" className="text-brand-yellow hover:underline">
                  support@tuckertools.com
                </a>{" "}
                or call{" "}
                <a href="tel:+18005551234" className="text-brand-yellow hover:underline">
                  1-800-555-1234
                </a>.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
