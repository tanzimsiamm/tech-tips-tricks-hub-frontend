// frontend/middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { IUserFrontend } from "./types/user";
import { getCurrentUser } from "./service/AuthService";

// Define authentication routes (publicly accessible even if not logged in)
// Update based on your actual (commonLayout) structure and public routes
const AUTH_ROUTES = [
  "/home",
  "/about",
  "/contact",
  "/latest-event",
  "/membership", // Common public pages
  "/found-items",
  "/found-items/:itemId*", // Public posts list and detail
  "/login",
  "/register", // Explicit auth pages
];

// Define role-based access control paths
const roleBasedRoutes = {
  user: [
    /^\/dashboard/,
    /^\/profile/,
    /^\/payments/,
    /^\/notifications/,
    /^\/posts\/create/,
    /^\/posts\/my-posts/,
    /^\/user-analytics/,
  ],
  admin: [
    /^\/admin/, // Covers all admin routes
  ],
};

type Role = keyof typeof roleBasedRoutes;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user: IUserFrontend | null = await getCurrentUser();

  // If user is NOT authenticated
  if (!user) {
    // Check if the path is in AUTH_ROUTES (publicly accessible)
    if (
      AUTH_ROUTES.some((route) => {
        // Handle dynamic segments like ':itemId*' or ':userEmail'
        if (route.includes(":")) {
          const regex = new RegExp(
            `^${route.replace(/:\w+\*/g, ".*").replace(/:\w+/g, "[^/]+")}$`
          );
          return regex.test(pathname);
        }
        return pathname === route; // Exact match
      })
    ) {
      return NextResponse.next(); // Allow access to public routes
    } else {
      // If trying to access a protected route without authentication, redirect to login
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  // If user IS authenticated
  // Special redirect for authenticated users trying to access login/register
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    // If authenticated, redirect them away from auth pages (e.g., to dashboard)
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Check role-based access for protected routes
  if (user?.role && roleBasedRoutes[user.role as Role]) {
    const allowedPathsForRole = roleBasedRoutes[user.role as Role];

    if (allowedPathsForRole.some((routeRegex) => routeRegex.test(pathname))) {
      // Admin trying to access user dashboard directly, redirect to admin dashboard
      if (user.role === "admin" && pathname === "/dashboard") {
        return NextResponse.redirect(
          new URL("/admin/admin-dashboard", request.url)
        );
      }
      return NextResponse.next(); // Allow access if role is authorized
    }
  }

  // If user is authenticated but tries to access a route they don't have permission for,
  // or a protected route not listed for their role, redirect to unauthorized or home.
  // Example: user role trying to access /admin/*
  return NextResponse.redirect(new URL("/unauthorized", request.url));
}

// Config for middleware matcher: paths where the middleware should run.
// This should cover all routes that need protection or redirection logic.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - The /api routes (your backend API, which middleware doesn't typically protect directly as it's separate from frontend pages)
     */
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
    // Specifically include pages that need protection or redirection based on your folder structure
    // This matcher should cover all possible frontend routes for checks
    "/home",
    "/about",
    "/contact",
    "/latest-event",
    "/membership/:path*",
    "/found-items/:path*",
    "/login",
    "/register",
    "/dashboard/:path*",
    "/profile/:path*",
    "/payments/:path*",
    "/notifications",
    "/posts/:path*",
    "/user-analytics",
    "/admin/:path*", // Match all admin paths
    "/unauthorized",
  ],
};
