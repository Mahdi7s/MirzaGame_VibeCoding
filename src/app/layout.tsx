
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'واژه بهشت - Vāژه Behesht',
  description: 'یک بازی کلمات فارسی جذاب الهام گرفته از آغامیرزا',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        {/* Font files (e.g., woff2 for B Titr) would typically be linked here or via @font-face in globals.css */}
        {/* For this setup, we rely on the user having 'B Titr' installed or CSS fallback. */}
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
