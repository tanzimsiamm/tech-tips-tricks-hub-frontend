// frontend/src/components/common/Navbar.tsx
"use client";
import React, { useState } from "react"; // Import useState
import Link from "next/link";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
// Remove Dropdown, DropdownTrigger, DropdownMenu, DropdownItem imports
import { useUser } from "../../context/user.provider";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import clsx from "clsx"; // Import clsx for conditional class joining

export default function Navbar() {
  const { user, logout, isLoading } = useUser();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu toggle
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // NEW: For desktop profile dropdown

  const navItems = [
    { label: "Home", href: "/home", authenticated: false, roles: [] },
    { label: "Posts", href: "/found-items", authenticated: false, roles: [] },
    {
      label: "Create Post",
      href: "/home/components/create-post",
      authenticated: true,
      roles: ["user", "admin"],
    },
    {
      label: "My Posts",
      href: "/user-dashboard/my-posts",
      authenticated: true,
      roles: ["user", "admin"],
    },
    {
      label: "Notifications",
      href: "/user-dashboard/notifications",
      authenticated: true,
      roles: ["user", "admin"],
    },
    {
      label: "Payment History",
      href: "/user-dashboard/my-payments",
      authenticated: true,
      roles: ["user", "admin"],
    },
    {
      label: "Profile",
      href: `/profile/${user?.email || ""}`,
      authenticated: true,
      roles: ["user", "admin"],
    },
    {
      label: "Admin Dashboard",
      href: "/admin-dashboard",
      authenticated: true,
      roles: ["admin"],
    },
  ];

  return (
    <NextUINavbar
      onMenuOpenChange={setIsMenuOpen}
      className="bg-blue-700 text-white shadow-md"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/home" className="font-bold text-xl text-white">
            Tech Hub
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navItems.map((item) => {
          if (item.authenticated && !user) return null;
          if (item.roles && user && !item.roles.includes(user.role))
            return null;

          return (
            <NavbarItem key={item.href}>
              <Link
                href={item.href}
                className="text-white hover:text-blue-200 transition-colors"
              >
                {item.label}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      <NavbarContent justify="end">
        {/* Theme Toggle */}
        <NavbarItem>
          <Button
            isIconOnly
            variant="light"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-white hover:bg-blue-600"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        </NavbarItem>

        {isLoading ? (
          <NavbarItem>
            <span className="text-gray-300 text-sm">Loading...</span>
          </NavbarItem>
        ) : user ? (
          // NEW: Custom Profile Dropdown Menu (instead of NextUI Dropdown)
          <NavbarItem className="relative">
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={user.name}
              size="sm"
              src={user.image}
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} // Toggle visibility on click
            />
            {/* Conditionally rendered dropdown content */}
            {isProfileMenuOpen && (
              <div
                className={clsx(
                  "absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50",
                  "origin-top-right transition-all duration-200 ease-out",
                  isProfileMenuOpen
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-0" // Simple animation
                )}
                // Optional: Add onMouseLeave to close when mouse leaves the dropdown area
                onMouseLeave={() => setIsProfileMenuOpen(false)}
              >
                <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                  <p className="font-semibold">Signed in as</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <Link href={`/profile/${user.email}`} passHref>
                  <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    My Profile
                  </a>
                </Link>
                <Link href="/user-dashboard" passHref>
                  <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Dashboard
                  </a>
                </Link>
                {user.role === "admin" && (
                  <Link href="/admin-dashboard" passHref>
                    <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Admin Panel
                    </a>
                  </Link>
                )}
                <div className="border-t border-gray-100 my-1"></div>
                <Button
                  variant="light"
                  color="danger"
                  className="w-full text-left justify-start px-4 py-2 text-sm"
                  onClick={logout}
                >
                  Log Out
                </Button>
              </div>
            )}
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/login" passHref>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-blue-600"
                >
                  Login
                </Button>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/register" passHref>
                <Button
                  color="primary"
                  className="bg-white text-blue-700 hover:bg-gray-200"
                >
                  Sign Up
                </Button>
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {/* Mobile Menu (remains unchanged) */}
      <NavbarMenu className="bg-blue-700 pt-8">
        {navItems.map((item) => {
          if (item.authenticated && !user) return null;
          if (item.roles && user && !item.roles.includes(user.role))
            return null;

          return (
            <NavbarMenuItem key={item.href}>
              <Link
                className="w-full text-white text-lg py-2 hover:text-blue-200"
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          );
        })}
        {!user && (
          <>
            <NavbarMenuItem>
              <Link
                href="/login"
                className="w-full text-white text-lg py-2 hover:text-blue-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                href="/register"
                className="w-full text-white text-lg py-2 hover:text-blue-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </NavbarMenuItem>
          </>
        )}
        {user && (
          <NavbarMenuItem>
            <Button color="danger" className="w-full mt-4" onClick={logout}>
              Logout
            </Button>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </NextUINavbar>
  );
}
