'use client';

import React from 'react';
import ProtectedRoute from '../../components/ProtectedRoute'; // Adjust path
import { useAuth } from '../../hooks/useAuth'; // Get user from useAuth
// import { useQuery } from '@tanstack/react-query'; // If you're fetching data with TanStack Query here

export default function DashboardPage() {
  const { user, logout } = useAuth(); // Access user from useAuth hook

  if (!user) {
    // This case should ideally be handled by ProtectedRoute, but good for fallback
    return <p>User data not available.</p>;
  }

  return (
    <ProtectedRoute allowedRoles={['user', 'admin']}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome, {user.name}!</h2>
          <p className="text-lg">Email: {user.email}</p>
          <p className="text-lg">Role: {user.role}</p>
          {user.image && (
            <img src={user.image} alt="Profile" className="w-24 h-24 rounded-full mt-4" />
          )}
          {user.memberShip && (
            <p className="text-md mt-2">Membership: {user.memberShip.package.name} (Expires: {new Date(user.memberShip.exp).toLocaleDateString()})</p>
          )}
          <button onClick={logout} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Logout
          </button>
        </div>
        {/* Display fetched data with TanStack Query if applicable */}
      </div>
    </ProtectedRoute>
  );
}