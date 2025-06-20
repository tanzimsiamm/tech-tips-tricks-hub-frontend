'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation'; // For navigation in App Router
import api from '../lib/api'; // Your Axios instance
import { queryClient } from '../lib/queryClient'; // Your TanStack Query client

// Define interfaces for user and authentication response
// These should match your backend's TUserProfileResponse and IAuthResponse
interface IUserProfile {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  image?: string;
  coverImg?: string;
  memberShip?: { takenDate: Date; exp: Date; package: { name: string; price: number; }; } | null;
  followers?: Array<{ _id: string; name: string; email: string; image?: string }>;
  following?: Array<{ _id: string; name: string; email: string; image?: string }>;
  isBlocked?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IAuthResponseData {
  token: string;
  user: IUserProfile;
}

// Define login/register payloads (match your backend's TLoginPayload, TRegisterPayload)
interface ILoginPayload {
  email: string;
  password: string;
}

interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
  image?: string;
  role?: 'user' | 'admin';
}


export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<IUserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // To track initial loading

  // Initialize auth state from localStorage on component mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser) as IUserProfile);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      // Clear potentially corrupted data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Login function
  const login = useCallback(async (credentials: ILoginPayload) => {
    setIsLoading(true);
    try {
      const response = await api.post<IAuthResponseData>('/auth/login', credentials);
      const { token, user } = response.data.data; // Access data.data as per your backend sendResponse

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      router.push('/dashboard'); // Redirect to dashboard or desired page
      return true;
    } catch (err: any) {
      console.error('Login failed:', err.response?.data || err.message);
      setIsAuthenticated(false);
      // Return false or throw error for component to handle
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Register function
  const register = useCallback(async (userData: IRegisterPayload) => {
    setIsLoading(true);
    try {
      const response = await api.post<IAuthResponseData>('/auth/register', userData);
      const { token, user } = response.data.data; // Access data.data

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      router.push('/dashboard'); // Redirect to dashboard or desired page
      return true;
    } catch (err: any) {
      console.error('Registration failed:', err.response?.data || err.message);
      setIsAuthenticated(false);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    queryClient.invalidateQueries(); // Invalidate all TanStack Query caches on logout
    router.push('/login'); // Redirect to login page
  }, [router]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    // You can add a function to refresh user data if needed
    // refreshUser: async () => { /* fetch /api/users/profile */ }
  };
};