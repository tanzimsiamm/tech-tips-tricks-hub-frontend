'use client';

import React from 'react';
import ProtectedRoute from '@/src/components/layout/ProtectedRoute';
import Footer from '@/src/components/layout/Footer';
import Navbar from '@/src/components/layout/Navbar';

// This layout can apply general protected rules to its children
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Apply ProtectedRoute here for all pages within (main) route group */}
        <ProtectedRoute>
          {children}
        </ProtectedRoute>
      </main>
      <Footer />
    </div>
  );
}