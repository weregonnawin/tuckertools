import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shipping Policy | Tucker Tools",
  description:
    "Learn about Tucker Tools shipping policies including free shipping thresholds, delivery timeframes, freight options, and tracking information.",
};

export default function ShippingPage() {
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
              <span className="text-gray-300">Shipping Policy</span>
            </nav>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[3px] bg-brand-yellow" />
              <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow">Policies</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wide text-white">
              Shipping Policy
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="space-y-12">

            {/* Free Shipping */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-3">
                <span className="w-5 h-[2px] bg-brand-yellow flex-shrink-0" />
                Free Shipping
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Tucker Tools offers <strong className="text-white">free standard shipping</strong> on all orders over{" "}
                <strong className="text-brand-yellow">$99</strong> shipping to addresses within the continental United States. Orders under $99 are subject to a flat-rate shipping fee calculated at checkout based on package weight and destination.
              </p>
            </section>

            {/* Delivery Timeframes */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-3">
                <span className="w-5 h-[2px] bg-brand-yellow flex-shrink-0" />
                Delivery Timeframes
              </h2>
              <p className="text-gray-400 leading-relaxed mb-5">
                We offer two standard shipping speeds for most orders. Delivery estimates begin from the date your order ships, not the date it is placed. Orders are typically processed and shipped within 1 business day.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-brand-dark border border-brand-steel/30 p-6">
                  <h3 className="text-base font-bold text-white mb-2">Standard Shipping</h3>
                  <p className="text-brand-yellow text-sm font-semibold mb-2">5–7 Business Days</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Free on orders over $99. Delivered via UPS, FedEx, or USPS Ground depending on package size and destination.
                  </p>
                </div>
                <div className="bg-brand-dark border border-brand-steel/30 p-6">
                  <h3 className="text-base font-bold text-white mb-2">Expedited Shipping</h3>
                  <p className="text-brand-yellow text-sm font-semibold mb-2">2–3 Business Days</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Available at an additional charge. Select the expedited option at checkout. Applicable to in-stock items only.
                  </p>
                </div>
              </div>
            </section>

            {/* Freight Shipping */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-3">
                <span className="w-5 h-[2px] bg-brand-yellow flex-shrink-0" />
                Freight Shipping for Large Items
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Certain heavy or oversized items — such as compressors, large generators, and industrial equipment — require freight (LTL) shipping rather than standard parcel delivery. Items requiring freight shipping are clearly marked on their product pages.
              </p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                  Freight shipping quotes are provided after order placement or upon request.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                  Delivery is to a ground-level address; lift-gate service may be available for an additional fee.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                  Please inspect all freight deliveries before signing. Note any damage on the carrier&apos;s delivery receipt.
                </li>
              </ul>
            </section>

            {/* Geographic Restrictions */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-3">
                <span className="w-5 h-[2px] bg-brand-yellow flex-shrink-0" />
                Service Area
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Tucker Tools currently ships to addresses within the <strong className="text-white">continental United States only</strong>. We do not ship to Alaska, Hawaii, U.S. territories, APO/FPO addresses, or international destinations at this time. We apologize for any inconvenience and are working to expand our coverage in the future.
              </p>
            </section>

            {/* Order Tracking */}
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide text-white mb-4 flex items-center gap-3">
                <span className="w-5 h-[2px] bg-brand-yellow flex-shrink-0" />
                Order Tracking
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Once your order ships, you will receive a shipping confirmation email containing your tracking number and a direct link to monitor your delivery. Tracking updates may take up to 24 hours to appear after the shipping label is generated. If you have not received a tracking email within 2 business days of placing your order, please contact us at{" "}
                <a href="mailto:support@tuckertools.com" className="text-brand-yellow hover:underline">
                  support@tuckertools.com
                </a>.
              </p>
            </section>

            {/* Questions */}
            <section className="border-t border-brand-steel/20 pt-10">
              <p className="text-gray-400 text-sm">
                Questions about your shipment? Reach out to our team at{" "}
                <a href="mailto:support@tuckertools.com" className="text-brand-yellow hover:underline">
                  support@tuckertools.com
                </a>{" "}
                or call us at{" "}
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
