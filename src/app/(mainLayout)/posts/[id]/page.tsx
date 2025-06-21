// frontend/src/app/(main)/posts/[id]/page.tsx
'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import api from '../../../../lib/api'; // Adjust path
import { Button } from '@heroui/button';
import Link from 'next/link';

// Re-use IPost type from posts/page.tsx or central types/posts.ts
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
  createdAt: string;
  updatedAt: string;
  user: { _id: string; name: string; email: string; image?: string; role: string; };
  comments?: Array<{ _id: string; user: { _id: string; name: string; email: string; image?: string }; text: string; createdAt: string; }>;
}

const fetchSinglePost = async (id: string): Promise<IPost> => {
  const response = await api.get(`/posts/${id}`);
  return response.data.data;
};

export default function SinglePostPage() {
  const params = useParams();
  const postId = params.id as string;

  const { data: post, isLoading, error } = useQuery<IPost>({
    queryKey: ['post', postId],
    queryFn: () => fetchSinglePost(postId),
    enabled: !!postId, // Only run query if postId is available
  });

  // Type guard for AxiosError
  function isAxiosError(err: unknown): err is { response?: { status: number } } {
    return typeof err === 'object' && err !== null && 'response' in err && typeof (err as any).response?.status === 'number';
  }

  if (!postId) return <p className="text-center text-gray-600">Post ID not provided.</p>;
  if (isLoading) return <p className="text-center text-gray-600">Loading post details...</p>;
  if (error) {
    // Handle specific backend errors (e.g., 403 for premium content)
    if (isAxiosError(error) && error.response?.status === 403) {
      return (
        <div className="text-center py-10">
          <h2 className="text-2xl text-red-600 font-semibold mb-4">Premium Content</h2>
          <p className="text-gray-700 mb-6">This post is for premium members only. Please subscribe to view.</p>
          <Link href="/payments/initiate" passHref>
            <Button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Become a Premium Member
            </Button>
          </Link>
        </div>
      );
    }
    return <p className="text-center text-red-600">Error loading post: {error instanceof Error ? error.message : 'Unknown error'}</p>;
  }
  if (!post) return <p className="text-center text-gray-600">Post not found.</p>;

  return (
    <div className="container mx-auto p-4 max-w-3xl bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-4 text-blue-800">{post.title}</h1>
      <p className="text-sm text-gray-600 mb-2">By: {post.user.name} ({post.user.role})</p>
      <p className="text-sm text-gray-500 mb-4">Category: <span className="font-medium text-blue-500">{post.category}</span></p>
      {post.isPremium && (
        <span className="inline-block bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full mb-4">Premium</span>
      )}
      <div className="prose lg:prose-xl max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />

      {post.images && post.images.length > 0 && (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {post.images.map((img, index) => (
            <img key={index} src={img} alt={`Post image ${index + 1}`} className="rounded-lg shadow-md max-w-full h-auto" />
          ))}
        </div>
      )}

      <div className="flex items-center space-x-4 text-gray-600 mb-8">
        <span>Views: {post.views}</span>
        <span>Upvotes: {post.upvotes}</span>
        <span>Downvotes: {post.downvotes}</span>
        {/* Add Upvote/Downvote buttons with useMutation */}
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Comments ({post.comments?.length || 0})</h2>
      <div className="space-y-4">
        {post.comments && post.comments.length > 0 ? (
          post.comments.map(comment => (
            <div key={comment._id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm font-medium text-gray-700">{comment.user.name}</p>
              <p className="text-gray-800">{comment.text}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No comments yet. Be the first to comment!</p>
        )}
        {/* Add comment form */}
      </div>
    </div>
  );
}