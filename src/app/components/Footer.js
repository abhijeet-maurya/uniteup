import React from 'react'
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-12 mt-auto transition-colors duration-300">
      <div className="w-full px-6 sm:px-8 lg:px-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Main Footer Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            
            {/* Quick Links Section */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-gray-200 mb-4">Quick Links</h3>
              <div className="flex flex-col space-y-2">
                <a 
                  href="/" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Home
                </a>
                <a 
                  href="/features" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Features
                </a>
                <a 
                  href="/about" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  About
                </a>
                <a 
                  href="/contact" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Social Icons Section */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-200 mb-4">Follow Us</h3>
              <div className="flex items-center justify-center space-x-4">
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-blue-500 transition-colors duration-200 p-2 rounded-full hover:bg-gray-700"
                  title="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 p-2 rounded-full hover:bg-gray-700"
                  title="Twitter"
                >
                  <Twitter size={20} />
                </a>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-pink-500 transition-colors duration-200 p-2 rounded-full hover:bg-gray-700"
                  title="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-blue-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-700"
                  title="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-red-500 transition-colors duration-200 p-2 rounded-full hover:bg-gray-700"
                  title="YouTube"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            {/* Support Email Section */}
            <div className="text-center md:text-right">
              <h3 className="text-lg font-semibold text-gray-200 mb-4">Need Help?</h3>
              <div>
                <p className="text-gray-300 text-sm mb-3">For support and inquiries:</p>
                <a 
                  href="mailto:support@uniteup.com" 
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm font-medium inline-flex items-center gap-2"
                >
                  <Mail size={16} />
                  support@uniteup.com
                </a>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="border-t border-gray-700 pt-6 text-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} UniteUp. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer