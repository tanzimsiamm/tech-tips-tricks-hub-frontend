'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth'; // Adjust path
import Link from 'next/link';
import { Input } from '@heroui/input'; // Assuming Heroui Input
import { Button } from '@heroui/button'; // Assuming Heroui Button

export default function RegisterPage() {
  const { register, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(''); // Optional image field
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await register({ name, email, password, image: image || undefined });
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full max-w-md">
      <h3 className="text-2xl font-bold text-center text-blue-700">Register a new account</h3>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <div>
            <label className="block text-gray-700" htmlFor="name">Name</label>
            <Input
              type="text"
              placeholder="Your Name"
              className="w-full mt-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700" htmlFor="email">Email</label>
            <Input
              type="email"
              placeholder="Email"
              className="w-full mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700" htmlFor="password">Password</label>
            <Input
              type="password"
              placeholder="Password"
              className="w-full mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700" htmlFor="image">Profile Image URL (Optional)</label>
            <Input
              type="url"
              placeholder="https://example.com/your-image.jpg"
              className="w-full mt-2"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="flex items-baseline justify-between mt-6">
            <Button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-900"
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
            <Link href="/login" className="text-sm text-blue-600 hover:underline">
              Already have an account?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}