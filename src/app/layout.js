'use client';
import {
  ClerkProvider,
} from '@clerk/nextjs';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./(pages)/components/Header";
import Footer from "./(pages)/components/Footer";
import { Toaster } from 'react-hot-toast';
import { usePathname } from 'next/navigation';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function LayoutContent({ children }) {
  const pathname = usePathname();
  
  // Pages that need centering
  const centeredPages = ['/'];
  const shouldCenter = centeredPages.includes(pathname);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-grow ${shouldCenter ? 'flex items-center justify-center' : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <LayoutContent>
          {children}
        </LayoutContent>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--toast-bg)',
              color: 'var(--toast-text)',
              border: '1px solid var(--toast-border)',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#ffffff',
              },
            },
          }}
        />
      </body>
    </html>
    </ClerkProvider>
  );
}
