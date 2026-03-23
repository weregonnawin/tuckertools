'use client';

import { useState, FormEvent } from 'react';

const INQUIRY_OPTIONS = [
  'Power Tools',
  'Hand Tools',
  'Outdoor Equipment',
  'Combo Kits',
  'Bulk Order',
  'Other',
];

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  inquiry: string;
  message: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    inquiry: '',
    message: '',
  });
  const [status, setStatus] = useState<SubmitStatus>('idle');

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  const inputBase =
    'w-full bg-[#1a1a1a] border border-[#4a4a4a] text-white px-4 py-3 rounded-sm text-sm placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors';

  return (
    <section id="contact" className="relative bg-[#111111] text-white">
      {/* Diagonal stripe divider */}
      <div
        className="h-16 w-full"
        style={{
          background:
            'repeating-linear-gradient(135deg, transparent, transparent 10px, rgba(245,158,11,0.07) 10px, rgba(245,158,11,0.07) 20px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            <span className="text-amber-500">REQUEST</span> A QUOTE
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl text-lg">
            Need pricing on tools or bulk orders? Fill out the form below and our
            team will get back to you within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Form — takes 3 of 5 columns */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-bold uppercase tracking-wide mb-2">
                  Full Name <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => update('fullName', e.target.value)}
                  placeholder="John Tucker"
                  className={inputBase}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold uppercase tracking-wide mb-2">
                  Email <span className="text-amber-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="john@company.com"
                  className={inputBase}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold uppercase tracking-wide mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  placeholder="(555) 000-0000"
                  className={inputBase}
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-bold uppercase tracking-wide mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => update('company', e.target.value)}
                  placeholder="Acme Construction"
                  className={inputBase}
                />
              </div>
            </div>

            {/* Inquiry Type */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-wide mb-2">
                What are you looking for?
              </label>
              <select
                value={form.inquiry}
                onChange={(e) => update('inquiry', e.target.value)}
                className={`${inputBase} appearance-none cursor-pointer`}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {INQUIRY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-wide mb-2">
                Message <span className="text-amber-500">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                placeholder="Tell us about the tools or equipment you need..."
                className={`${inputBase} resize-none`}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-amber-500 text-black font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-sm hover:bg-amber-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  SENDING...
                </span>
              ) : (
                'SEND REQUEST'
              )}
            </button>

            {/* Status messages */}
            {status === 'success' && (
              <p className="text-green-400 font-medium mt-2">
                Thanks! We&apos;ll be in touch within 24 hours.
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-400 font-medium mt-2">
                Something went wrong. Please try again or contact us directly.
              </p>
            )}
          </form>

          {/* Contact Info — takes 2 of 5 columns */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-500 mb-6">
                Contact Info
              </h3>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-amber-500">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm uppercase tracking-wide text-gray-300">
                      Email
                    </p>
                    <a
                      href="mailto:support@tuckertools.com"
                      className="text-white hover:text-amber-500 transition-colors"
                    >
                      support@tuckertools.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-amber-500">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm uppercase tracking-wide text-gray-300">
                      Phone
                    </p>
                    <a
                      href="tel:+18005550199"
                      className="text-white hover:text-amber-500 transition-colors"
                    >
                      (800) 555-0199
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-amber-500">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm uppercase tracking-wide text-gray-300">
                      Business Hours
                    </p>
                    <p className="text-white">Mon - Fri, 8AM - 6PM EST</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-amber-500">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm uppercase tracking-wide text-gray-300">
                      Location
                    </p>
                    <p className="text-white">Tucker Tools HQ</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Callout box */}
            <div className="border border-[#4a4a4a] rounded-sm p-6 bg-[#1a1a1a]">
              <p className="text-amber-500 font-bold text-sm uppercase tracking-wider mb-2">
                Bulk Orders
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Ordering for a crew or jobsite? We offer volume discounts on bulk
                orders of 10+ units. Mention it in your message and we&apos;ll
                include pricing tiers in our quote.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
