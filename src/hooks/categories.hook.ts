// frontend/src/hooks/categories.hook.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import api from '../lib/api'; // Adjust path
import { IBackendResponse } from '../types/api';
import { ICategoryFrontend } from '../types/categories';

// Service function to fetch categories from the backend
const getCategories = async (): Promise<ICategoryFrontend[]> => {
  const response = await api.get<IBackendResponse<ICategoryFrontend[]>>('/categories'); // Assuming backend /api/categories endpoint
  if (!response.data.success) {
    throw new Error(response.data.message || 'Failed to fetch categories');
  }
  return response.data.data;
};

export const useGetCategories = () => {
  return useQuery<ICategoryFrontend[], Error>({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 60, // Categories are relatively static, can be stale for an hour
  });
};