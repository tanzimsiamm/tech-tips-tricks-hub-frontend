// frontend/src/app/(dashboardLayout)/layout.tsx
'use client';

import React from 'react';
import ProtectedRoute from '../../components/layout/ProtectedRoute'; // Adjust path
import Navbar from '@/src/components/common/Navbar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute allowedRoles={['user', 'admin']}> {/* Pages in dashboardLayout require user or admin */}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          {/* Dashboard specific navigation or components can go here */}
          {children}
        </main>
        <footer />
      </div>
    </ProtectedRoute>
  );
}