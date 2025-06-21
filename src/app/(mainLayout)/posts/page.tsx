// frontend/src/app/(main)/posts/page.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import api from '../../../lib/api'; // Adjust path
import PostCard from '../../../components/posts/PostCard'; // Adjust path

// You'll need to define IPost type in frontend/src/types/posts.ts
interface IPost {
  _id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  isPremium: boolean;
  upvotes: number;
  downvotes: number;
  views: number;
  images?: string[];
  createdAt: string; // Dates often come as ISO strings from API
  updatedAt: string;
  user: { _id: string; name: string; email: string; image?: string; role: string; }; // Populated user
  comments?: any[]; // Simplified for now
}

const fetchAllPosts = async (): Promise<IPost[]> => {
  const response = await api.get('/posts'); // Use your backend endpoint
  return response.data.data; // Adjust based on your sendResponse structure
};

export default function PostsPage() {
  const { data: posts, isLoading, error } = useQuery<IPost[]>({
    queryKey: ['posts'],
    queryFn: fetchAllPosts,
  });

  if (isLoading) return <p className="text-center text-gray-600">Loading posts...</p>;
  if (error) return <p className="text-center text-red-600">Error loading posts: {error.message}</p>;
  if (!posts || posts.length === 0) return <p className="text-center text-gray-600">No posts found.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">All Posts</h1>
      <Link href="/posts/create" className="inline-block px-4 py-2 mb-4 bg-green-600 text-white rounded-md hover:bg-green-700 shadow-md">
        Create New Post
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}