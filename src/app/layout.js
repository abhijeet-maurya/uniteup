import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "UniteUp – Video Meetings, Tasks & Team Collaboration",
  description: "UniteUp is your all-in-one platform for video meetings, team chat, task scheduling, event reminders, and collaboration—fully customizable with multiple themes.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="min-h-[90vh] flex-grow flex items-center justify-center">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
    </ClerkProvider>
  );
}
