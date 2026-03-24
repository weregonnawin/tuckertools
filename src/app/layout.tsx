import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tucker Tools | Professional Power Tools & Equipment",
  description:
    "Shop top brands like Milwaukee, DeWalt, Makita, Ryobi & more. Professional-grade power tools, hand tools, and equipment for contractors and DIY enthusiasts.",
  keywords:
    "power tools, Milwaukee, DeWalt, Makita, Ryobi, Bosch, professional tools, contractor tools, equipment",
  openGraph: {
    title: "Tucker Tools | Professional Power Tools & Equipment",
    description:
      "Your source for professional-grade power tools from top brands.",
    type: "website",
    url: "https://tuckertools.com",
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
