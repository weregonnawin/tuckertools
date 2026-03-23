import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Returns Policy | Tucker Tools",
  description:
    "Tucker Tools 30-day returns policy. Learn how to return unused items, what to expect for defective products, and how to initiate a return.",
};

export default function ReturnsPage() {
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
              <span className="text-gray-300">Returns Policy</span>
            </nav>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[3px] bg-brand-yellow" />
              <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow">Policies</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wide text-white">
              Returns Policy
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="space-y-12">

            {/* Overview */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-3">
                <span className="w-5 h-[2px] bg-brand-yellow flex-shrink-0" />
                30-Day Return Window
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Tucker Tools accepts returns on most items within <strong className="text-white">30 days of the original delivery date</strong>. To be eligible for a return, items must be unused, in their original condition, and in their original manufacturer&apos;s packaging with all included accessories, manuals, and hardware present.
              </p>
            </section>

            {/* Eligibility */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-3">
                <span className="w-5 h-[2px] bg-brand-yellow flex-shrink-0" />
                Return Eligibility
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-white mb-3">Eligible for Return</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                      Unused items in original, sealed packaging
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                      Items with all original accessories included
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                      Defective or damaged items (see below)
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                      Incorrect items shipped in error
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-white mb-3">Not Eligible for Return</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-steel mt-1.5 flex-shrink-0" />
                      Used, installed, or assembled tools
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-steel mt-1.5 flex-shrink-0" />
                      Items returned after 30 days
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-steel mt-1.5 flex-shrink-0" />
                      Items missing original packaging or components
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-steel mt-1.5 flex-shrink-0" />
                      Special-order or custom-configured items
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Defective Items */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-3">
                <span className="w-5 h-[2px] bg-brand-yellow flex-shrink-0" />
                Defective or Damaged Items
              </h2>
              <p className="text-gray-400 leading-relaxed">
                If you receive an item that is defective, damaged in transit, or not as described, Tucker Tools will cover the cost of return shipping and offer you a choice of a <strong className="text-white">full exchange</strong> for the same item or a <strong className="text-white">complete refund</strong> to your original payment method. Please contact us within 7 days of delivery to report the issue and include photos of the damage where possible.
              </p>
            </section>

            {/* Restocking Fee */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-3">
                <span className="w-5 h-[2px] bg-brand-yellow flex-shrink-0" />
                Restocking Fee
              </h2>
              <p className="text-gray-400 leading-relaxed">
                A restocking fee of <strong className="text-white">15%</strong> of the item&apos;s purchase price may apply to non-defective returns, particularly for opened items or returns that do not meet our standard eligibility criteria. We will always communicate any applicable restocking fee before processing your return. No restocking fee applies to defective item returns or to items shipped incorrectly by Tucker Tools.
              </p>
            </section>

            {/* Return Shipping */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-3">
                <span className="w-5 h-[2px] bg-brand-yellow flex-shrink-0" />
                Return Shipping Costs
              </h2>
              <p className="text-gray-400 leading-relaxed">
                For standard (non-defective) returns, the <strong className="text-white">customer is responsible</strong> for the cost of return shipping. We recommend using a trackable shipping method and retaining your shipping receipt, as Tucker Tools is not responsible for items lost or damaged in transit during a return. Return shipping costs are non-refundable.
              </p>
            </section>

            {/* How to Initiate */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-3">
                <span className="w-5 h-[2px] bg-brand-yellow flex-shrink-0" />
                How to Initiate a Return
              </h2>
              <p className="text-gray-400 leading-relaxed mb-5">
                To begin the return process, follow these steps:
              </p>
              <ol className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "Contact Us",
                    body: (
                      <>
                        Email{" "}
                        <a href="mailto:support@tuckertools.com" className="text-brand-yellow hover:underline">
                          support@tuckertools.com
                        </a>{" "}
                        with your order number, the item(s) you wish to return, and the reason for the return.
                      </>
                    ),
                  },
                  {
                    step: "2",
                    title: "Receive Return Authorization",
                    body: "Our team will review your request and respond within 1–2 business days with a Return Merchandise Authorization (RMA) number and return shipping instructions.",
                  },
                  {
                    step: "3",
                    title: "Pack & Ship",
                    body: "Securely pack the item in its original packaging, clearly mark the RMA number on the outside of the box, and ship to the address provided.",
                  },
                  {
                    step: "4",
                    title: "Refund or Exchange Processed",
                    body: "Once we receive and inspect the returned item, your refund or exchange will be processed within 5–7 business days. Refunds are issued to the original payment method.",
                  },
                ].map(({ step, title, body }) => (
                  <li key={step} className="flex gap-4 bg-brand-dark border border-brand-steel/30 p-5">
                    <div className="w-8 h-8 flex items-center justify-center bg-brand-yellow text-brand-black font-black text-sm flex-shrink-0">
                      {step}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm mb-1">{title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Questions */}
            <section className="border-t border-brand-steel/20 pt-10">
              <p className="text-gray-400 text-sm">
                Questions about a return or exchange? Contact our support team at{" "}
                <a href="mailto:support@tuckertools.com" className="text-brand-yellow hover:underline">
                  support@tuckertools.com
                </a>{" "}
                or call{" "}
                <a href="tel:+18005550199" className="text-brand-yellow hover:underline">
                  (800) 555-0199
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
