// frontend/src/app/(dashboardLayout)/admin-dashboard/page.tsx
'use client';

import React from 'react';
import { Button } from '@nextui-org/button';
import { useUser } from '../../../context/user.provider'; // Adjust path
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { user } = useUser(); // Get user from context

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Admin Dashboard</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Welcome, Admin {user?.name || ''}!</h2>
        <p className="text-lg text-gray-700 mb-4">Here you can manage the application.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/admin-dashboard/manage-users" passHref> {/* Path relative to /admin-dashboard */}
                <Button variant="flat" color="primary" className="h-20 text-lg">Manage Users</Button>
            </Link>
            <Link href="/admin-dashboard/manage-posts" passHref>
                <Button variant="flat" color="primary" className="h-20 text-lg">Manage Posts</Button>
            </Link>
            <Link href="/admin-dashboard/manage-admins" passHref>
                <Button variant="flat" color="primary" className="h-20 text-lg">Manage Admins</Button>
            </Link>
            <Link href="/admin-dashboard/payment-history" passHref>
                <Button variant="flat" color="primary" className="h-20 text-lg">Payment History</Button>
            </Link>
            <Link href="/admin-dashboard/statistics" passHref>
                <Button variant="flat" color="primary" className="h-20 text-lg">View Statistics</Button>
            </Link>
            {/* Add more admin management links */}
        </div>
      </div>
    </div>
  );
}