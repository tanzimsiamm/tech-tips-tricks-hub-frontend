// frontend/src/services/categories.ts
// This file will contain functions to fetch category data from the backend.
'use client'; // Client-side fetch

import api from '../lib/api'; // Adjust path
import { IBackendResponse } from '../types/api';
import { ICategoryFrontend } from '../types/categories';

export const getCategoriesService = async (): Promise<ICategoryFrontend[]> => {
    const response = await api.get<IBackendResponse<ICategoryFrontend[]>>('/categories'); // Assuming backend /api/categories endpoint
    if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch categories');
    }
    return response.data.data;
};