// frontend/src/components/posts/PostCard.tsx
import React from 'react';
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
  createdAt: string; // Dates often come as ISO strings from API
  updatedAt: string;
  user: { _id: string; name: string; email: string; image?: string; role: string; }; // Populated user
  comments?: any[];
}

interface PostCardProps {
  post: IPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  // Simple stripping of HTML for card preview
  const previewContent = post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...';

  return (
    // Assuming a Heroui Card component is available, otherwise use a div with styling
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
      {post.images && post.images.length > 0 && (
        <div className="h-48 w-full overflow-hidden">
          <img src={post.images[0]} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-blue-600">{post.category}</span>
          {post.isPremium && (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">Premium</span>
          )}
        </div>
        <Link href={`/posts/${post._id}`} className="text-xl font-bold text-gray-900 hover:text-blue-700 transition-colors mb-2">
          {post.title}
        </Link>
        <p className="text-gray-700 text-sm mb-4 flex-grow">{previewContent}</p>
        <div className="flex justify-between items-center text-gray-500 text-xs mt-auto">
          <span>By {post.user.name}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center justify-between text-gray-600 text-sm mt-3">
          <div className="flex items-center space-x-2">
            <span>👍 {post.upvotes}</span>
            <span>👎 {post.downvotes}</span>
            <span>👀 {post.views}</span>
          </div>
          <span>💬 {post.comments?.length || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;