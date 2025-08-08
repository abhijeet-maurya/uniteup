'use client';
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from '@clerk/nextjs';
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bell, Sun, Moon, Circle } from 'lucide-react'


const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)

  // Initialize theme on component mount
  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)

    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="w-full px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16">

          {/* Left Side */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-4">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                  <Circle className="w-4 h-4 fill-current" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
                  UniteUp
                </h1>
              </div>
            </div>
          </Link>

          {/* Right Side */}
          <div className="flex items-center space-x-4">

            {/* Notifications */}
            <div className="relative">
              <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>
            </div>

            {/* Theme Toggle */}
            <div>
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
            </div>

            {/* Authentication Buttons */}
            <div className="flex items-center space-x-3">
              <SignedOut>
                <Link href="/login">
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    Login
                  </button>
                </Link>
              
                <Link href="/register">
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors shadow-sm">
                    Sign Up
                  </button>
                </Link>
              </SignedOut>
              <SignedIn>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                      userButtonTrigger: "focus:shadow-none",
                      userButtonAvatar: "w-8 h-8",
                      userButtonPopoverCard: "w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg",
                      userButtonPopoverMain: "bg-white dark:bg-gray-800",
                      userButtonPopoverFooter: "bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700",
                      userPreviewMainIdentifier: "text-gray-900 dark:text-white font-medium",
                      userPreviewSecondaryIdentifier: "text-gray-500 dark:text-gray-400",
                      userButtonPopoverActionButton: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white",
                      userButtonPopoverActionButtonIcon: "text-gray-500 dark:text-gray-400",
                      userButtonPopoverActionButtonText: "text-gray-700 dark:text-gray-300",
                      userButtonPopoverActions: "space-y-1",
                      profileSectionPrimaryButton: "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600",
                    }
                  }}
                />
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header