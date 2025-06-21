import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Tech Tips & Tricks Hub. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link href="/about" className="text-gray-400 hover:text-white">About Us</Link>
          <Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link>
          <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}