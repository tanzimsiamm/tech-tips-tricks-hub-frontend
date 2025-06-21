import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <h1 className="text-5xl font-bold mb-6 text-blue-700">
        Welcome to Tech Tips & Tricks Hub
      </h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Your go-to platform for expert tech advice, personal experiences, and user-generated content.
      </p>
      <div className="space-x-4">
        <Link href="/login" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          Login
        </Link>
        <Link href="/register" className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg shadow-md hover:bg-blue-50 transition duration-300">
          Register
        </Link>
        <Link href="/posts" className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300">
          View Posts
        </Link>
      </div>
    </div>
  );
}