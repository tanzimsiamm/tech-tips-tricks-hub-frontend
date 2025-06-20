import axios from 'axios';
import { QueryClient } from '@tanstack/react-query'; // Import QueryClient if you want to invalidate queries on logout

// Create a new QueryClient instance if it's not globally available yet
// This is optional and mainly for invalidateQueries on logout
const queryClient = new QueryClient();

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the JWT token to headers
api.interceptors.request.use(
  (config) => {
    // Ensure this runs only on client-side (during SSR, localStorage is not available)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration/unauthorized errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Check for 401 (Unauthorized) status
    if (error.response && error.response.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loops

      // Clear token and user info from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // Assuming you store user info here
        // Invalidate all TanStack Query caches related to user data
        queryClient.invalidateQueries(); // Invalidate all queries on logout

        // Redirect to login page
        window.location.href = '/login'; // Use Next.js useRouter for smoother navigation if in a component
      }
    }
    return Promise.reject(error);
  }
);

export default api;