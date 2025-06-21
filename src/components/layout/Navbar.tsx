'use client';
import React from 'react';
import Link from 'next/link';
import { Navbar as HerouiNavbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar'; // Assuming Heroui Navbar
import { Button } from '@heroui/button'; // Assuming Heroui Button
import { useAuth } from '../../hooks/useAuth'; // Adjust path

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    // Using Heroui Navbar component
    <HerouiNavbar className="bg-blue-700 text-white shadow-md">
      <NavbarBrand>
        <Link href="/" className="font-bold text-xl text-white">
          Tech Hub
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4">
        <NavbarItem>
          <Link href="/posts" className="text-white hover:text-blue-200 transition-colors">
            Posts
          </Link>
        </NavbarItem>
        {isAuthenticated && (
          <>
            <NavbarItem>
              <Link href="/notifications" className="text-white hover:text-blue-200 transition-colors">
                Notifications
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/payments/history" className="text-white hover:text-blue-200 transition-colors">
                Payments
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/profile" className="text-white hover:text-blue-200 transition-colors">
                Profile
              </Link>
            </NavbarItem>
            {user?.role === 'admin' && (
              <NavbarItem>
                <Link href="/admin" className="text-white hover:text-blue-200 transition-colors">
                  Admin
                </Link>
              </NavbarItem>
            )}
          </>
        )}
      </NavbarContent>
      <NavbarContent justify="end">
        {isAuthenticated ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <span className="text-white">Hi, {user?.name || 'User'}</span>
            </NavbarItem>
            <NavbarItem>
              <Button
                onClick={logout}
                className="bg-red-500 text-white hover:bg-red-600 transition-colors" // Example styling
              >
                Logout
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/login">
                <Button variant="ghost" className="text-white hover:bg-blue-600">Login</Button>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/register">
                <Button className="bg-white text-blue-700 hover:bg-gray-200">Sign Up</Button>
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </HerouiNavbar>
  );
}