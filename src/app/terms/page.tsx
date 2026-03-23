import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Tucker Tools",
  description:
    "Tucker Tools Terms of Service. Read our terms covering product availability, pricing, quotes, intellectual property, and limitation of liability.",
};

export default function TermsPage() {
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
              <span className="text-gray-300">Terms of Service</span>
            </nav>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[3px] bg-brand-yellow" />
              <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow">Legal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wide text-white">
              Terms of Service
            </h1>
            <p className="text-gray-500 text-sm mt-3">Effective date: March 2026</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="space-y-12">

            {/* Introduction */}
            <section>
              <p className="text-gray-400 leading-relaxed">
                Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully before using the Tucker Tools website located at tuckertools.com (&ldquo;Site&rdquo;) or placing any order with us. By accessing or using our Site, you agree to be bound by these Terms. If you do not agree, please do not use our Site.
              </p>
            </section>

            {/* Acceptance */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-3">
                <span className="w-5 h-[2px] bg-brand-yellow flex-shrink-0" />
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-400 leading-relaxed">
                These Terms constitute a legally binding agreement between you and Tucker Tools. We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the Site following any changes constitutes your acceptance of the revised Terms. We encourage you to review this page periodically.
              </p>
            </section>

            {/* Product Availability & Pricing */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-3">
                <span className="w-5 h-[2px] bg-brand-yellow flex-shrink-0" />
                2. Product Availability &amp; Pricing
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Tucker Tools strives to maintain accurate product listings and pricing on our Site. However, we make no guarantees regarding product availability or price accuracy.
              </p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                  Product availability is subject to change without notice. Items displayed on the Site may be out of stock or discontinued at any time.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                  Pricing is subject to change at any time. In the event of a pricing error, Tucker Tools reserves the right to cancel the affected order and notify you promptly.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                  All prices are listed in U.S. dollars and do not include applicable taxes, which will be calculated at checkout.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                  Tucker Tools reserves the right to limit order quantities and refuse service at its discretion.
                </li>
              </ul>
            </section>

            {/* Quotes */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-3">
                <span className="w-5 h-[2px] bg-brand-yellow flex-shrink-0" />
                3. Quotes
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Quotes provided by Tucker Tools are valid for <strong className="text-white">30 days</strong> from the date of issuance unless otherwise stated in writing. After 30 days, quoted pricing and availability are subject to change and the quote must be reconfirmed before an order is placed. A quote does not constitute a binding contract or guarantee of product availability until an order is formally accepted and confirmed by Tucker Tools.
              </p>
            </section>

            {/* Orders & Payment */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-3">
                <span className="w-5 h-[2px] bg-brand-yellow flex-shrink-0" />
                4. Orders &amp; Payment
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                By placing an order, you represent that you are legally authorized to make the purchase and that all information provided is accurate and complete. Tucker Tools reserves the right to accept or decline any order for any reason. Orders are not final until you receive an order confirmation email.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Full payment is required before orders are processed and shipped. We accept major credit and debit cards. Payment information is processed through secure, PCI-compliant payment processors.
              </p>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-3">
                <span className="w-5 h-[2px] bg-brand-yellow flex-shrink-0" />
                5. Intellectual Property
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                All content on the Tucker Tools website — including but not limited to text, graphics, logos, images, product descriptions, and software — is the property of Tucker Tools or its content suppliers and is protected by applicable intellectual property laws.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Brand names, logos, and trademarks of products sold on this Site (such as Milwaukee, DeWalt, Makita, Bosch, and others) are the property of their respective manufacturers and are used for identification purposes only. Tucker Tools is not affiliated with, sponsored by, or endorsed by these manufacturers except as expressly noted as an authorized dealer. You may not reproduce, republish, distribute, or commercially exploit any content from this Site without prior written permission from Tucker Tools.
              </p>
            </section>

            {/* Disclaimer of Warranties */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-3">
                <span className="w-5 h-[2px] bg-brand-yellow flex-shrink-0" />
                6. Disclaimer of Warranties
              </h2>
              <p className="text-gray-400 leading-relaxed">
                The Tucker Tools website and its content are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement. Tucker Tools does not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components. Product warranties are provided solely by the respective manufacturers and are subject to each manufacturer&apos;s terms.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-3">
                <span className="w-5 h-[2px] bg-brand-yellow flex-shrink-0" />
                7. Limitation of Liability
              </h2>
              <p className="text-gray-400 leading-relaxed">
                To the fullest extent permitted by applicable law, Tucker Tools and its officers, employees, agents, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including lost profits, data loss, or business interruption — arising from your use of or inability to use the Site or any products purchased through it, even if Tucker Tools has been advised of the possibility of such damages. In no event shall Tucker Tools&apos;s total liability to you for all claims exceed the amount you paid for the specific product giving rise to the claim.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-3">
                <span className="w-5 h-[2px] bg-brand-yellow flex-shrink-0" />
                8. Governing Law
              </h2>
              <p className="text-gray-400 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the <strong className="text-white">United States</strong> and the state in which Tucker Tools is incorporated, without regard to its conflict of law principles. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in that state. If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
              </p>
            </section>

            {/* Third-Party Links */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-3">
                <span className="w-5 h-[2px] bg-brand-yellow flex-shrink-0" />
                9. Third-Party Links
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Our Site may contain links to third-party websites for informational purposes. Tucker Tools has no control over the content or practices of those sites and is not responsible for their privacy policies or terms. Accessing any third-party link is at your own risk.
              </p>
            </section>

            {/* Contact */}
            <section className="border-t border-brand-steel/20 pt-10">
              <h2 className="text-base font-bold uppercase tracking-wide text-white mb-3">Contact Us</h2>
              <p className="text-gray-400 text-sm">
                If you have questions about these Terms of Service, please contact us at{" "}
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
