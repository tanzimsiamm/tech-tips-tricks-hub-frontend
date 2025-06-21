'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth'; // Adjust path
import Link from 'next/link';
import { Input } from '@heroui/input'; // Assuming Heroui Input
import { Button } from '@heroui/button'; // Assuming Heroui Button

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login({ email, password });
      // Redirection handled by useAuth hook
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full max-w-md">
      <h3 className="text-2xl font-bold text-center text-blue-700">Login to your account</h3>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <div>
            <label className="block text-gray-700" htmlFor="email">Email</label>
            {/* Use Heroui Input */}
            <Input
              type="email"
              placeholder="Email"
              className="w-full mt-2" // Heroui components usually handle styling
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700" htmlFor="password">Password</label>
            {/* Use Heroui Input */}
            <Input
              type="password"
              placeholder="Password"
              className="w-full mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="flex items-baseline justify-between mt-6">
            {/* Use Heroui Button */}
            <Button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-900" // Example styling
              disabled={isLoading}
            >
              {isLoading ? 'Logging In...' : 'Login'}
            </Button>
            <Link href="/register" className="text-sm text-blue-600 hover:underline">
              Don't have an account?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}