// frontend/src/app/(dashboardLayout)/user-dashboard/page.tsx
'use client';

import React from 'react';
import { Button } from '@heroui/button';
import { useUser } from '../../../context/user.provider';
import Link from 'next/link';

export default function UserDashboardPage() {
  const { user, logout } = useUser();

  if (!user) {
    return <p className="text-center text-gray-600">Loading user data or user not found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">User Dashboard</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Welcome, {user.name}!</h2>
        <p className="text-lg text-gray-600">Email: {user.email}</p>
        <p className="text-lg text-gray-600">Role: {user.role}</p>
        {user.image && (
          <img src={user.image} alt="Profile" className="w-24 h-24 rounded-full object-cover mt-4 border-2 border-blue-300" />
        )}
        {user.memberShip && (
          <p className="text-md mt-2 text-gray-600">
            Membership: <span className="font-medium text-blue-600">{user.memberShip.package.name}</span> (Expires:{' '}
            {user.memberShip.exp ? new Date(user.memberShip.exp).toLocaleDateString() : 'N/A'})
          </p>
        )}
        <div className="mt-6 flex gap-4">
            <Link href={`/profile/${user.email}`} passHref> {/* Link to user's specific profile page */}
                <Button color="primary" className="shadow-md">View Profile</Button>
            </Link>
            <Link href="/home/components/create-post" passHref> {/* Adjust path to create post */}
                <Button color="success" className="shadow-md">Create Post</Button>
            </Link>
            <Button onClick={logout} color="danger" className="shadow-md">
                Logout
            </Button>
        </div>
      </div>
    </div>
  );
}