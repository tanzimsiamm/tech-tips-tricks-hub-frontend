// frontend/src/services/post.ts
// This file will contain functions to fetch/manage post data.
'use client'; // Client-side fetch

import api from '../lib/api'; // Adjust path
import { IBackendResponse } from '../types/api';
import { IPostFrontend } from '../types/posts';

// Function to fetch a single post
export const getPost = async (postId: string): Promise<IPostFrontend> => {
    const response = await api.get<IBackendResponse<IPostFrontend>>(`/posts/${postId}`);
    if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch post');
    }
    return response.data.data;
};

// Function to fetch all posts (with query params for search/filter/pagination)
export const getAllPostsService = async (queryParams?: Record<string, any>): Promise<{ posts: IPostFrontend[], total: number, page: number, limit: number }> => {
    const response = await api.get<IBackendResponse<IPostFrontend[]>>('/posts', { params: queryParams });
    if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch posts');
    }
    // Backend sendResponse returns posts in `data` and meta in `meta`
    return {
      posts: response.data.data,
      total: response.data.meta?.total || 0,
      page: response.data.meta?.page || 1,
      limit: response.data.meta?.limit || 10,
    };
};