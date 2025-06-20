'use client';

import React from 'react';
import ProtectedRoute from '../../components/ProtectedRoute'; // Adjust path
// import { useQuery } from '@tanstack/react-query'; // If fetching admin data

export default function AdminDashboardPage() {
  // You might fetch admin-specific statistics or user lists here using TanStack Query

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <p className="text-lg">Welcome to the admin panel. Here you can manage users, content, and view statistics.</p>
        {/* Admin specific content */}
      </div>
    </ProtectedRoute>
  );
}