
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'آغامیرزا',
  description: 'یک بازی کلمات فارسی جذاب - آغامیرزا',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        {/* The Google Font import for Literata has been removed. */}
        {/* If you have B Titr font files (e.g., woff2), you would typically add @font-face rules in globals.css */}
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
