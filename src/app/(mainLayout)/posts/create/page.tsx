// frontend/src/app/(main)/posts/create/page.tsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Listbox, ListboxItem } from '@heroui/listbox'; // Assuming Heroui Listbox for category
import api from '@/src/lib/api';
// import RichTextEditor from '../../../components/ui/RichTextEditor'; // You'll need a Rich Text Editor component

// Re-use types from frontend/src/types/posts.ts once created
interface ICreatePostPayload {
  title: string;
  content: string; // HTML content
  category: 'Web' | 'Software Engineering' | 'AI' | 'Mobile' | 'Cybersecurity' | 'Data Science' | 'Other';
  tags?: string[];
  isPremium?: boolean;
  images?: string[];
}

const categories = ['Web', 'Software Engineering', 'AI', 'Mobile', 'Cybersecurity', 'Data Science', 'Other'];

const createNewPost = async (postData: ICreatePostPayload) => {
  const response = await api.post('/posts', postData);
  return response.data;
};

export default function CreatePostPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); // For rich text editor content
  const [category, setCategory] = useState<typeof categories[number] | undefined>(undefined);
  const [tagsInput, setTagsInput] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [imagesInput, setImagesInput] = useState(''); // Comma-separated image URLs
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: createNewPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] }); // Invalidate posts list cache
      router.push('/posts'); // Redirect to posts list
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || err.message || 'Failed to create post.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !content || !category) {
      setError('Title, Content, and Category are required.');
      return;
    }

    const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : undefined;
    const images = imagesInput ? imagesInput.split(',').map(img => img.trim()).filter(img => img.length > 0) : undefined;

    mutation.mutate({ title, content, category: category as ICreatePostPayload['category'], tags, isPremium, images });
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <Input
            type="text"
            id="title"
            placeholder="Enter post title"
            className="w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Content</label>
          {/* This should be your Rich Text Editor Component */}
          {/* <RichTextEditor value={content} onChange={setContent} /> */}
          <textarea
            id="content"
            placeholder="Write your post content here..."
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-48"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
          {/* Use Heroui Listbox or a custom Select for categories */}
          <select
            id="category"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={category || ''}
            onChange={(e) => {
              const value = e.target.value;
              if (categories.includes(value as typeof categories[number])) {
                setCategory(value as typeof categories[number]);
              } else {
                setCategory(undefined);
              }
            }}
            required
          >
            <option value="" disabled>Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {/* Heroui Listbox might look cleaner: */}
          {/* <Listbox<typeof categories[number]>
            aria-label="Category"
            selectedKeys={category ? [category] : []}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0];
              setCategory(selected as typeof categories[number]);
            }}
          >
            {categories.map((cat) => (
              <ListboxItem key={cat} id={cat}>{cat}</ListboxItem>
            ))}
          </Listbox> */}
        </div>

        <div className="mb-4">
          <label htmlFor="tags" className="block text-gray-700 text-sm font-bold mb-2">Tags (comma-separated)</label>
          <Input
            type="text"
            id="tags"
            placeholder="e.g., javascript, webdev, tutorial"
            className="w-full"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="isPremium"
            className="mr-2 h-4 w-4 text-blue-600 rounded"
            checked={isPremium}
            onChange={(e) => setIsPremium(e.target.checked)}
          />
          <label htmlFor="isPremium" className="text-gray-700 text-sm font-bold">Premium Content</label>
        </div>

        <div className="mb-4">
          <label htmlFor="images" className="block text-gray-700 text-sm font-bold mb-2">Image URLs (comma-separated)</label>
          <Input
            type="text"
            id="images"
            placeholder="e.g., https://img1.com/a.jpg, https://img2.com/b.png"
            className="w-full"
            value={imagesInput}
            onChange={(e) => setImagesInput(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <Button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md"
          disabled={mutation.status === 'pending'}
        >
          {mutation.status === 'pending' ? 'Creating...' : 'Create Post'}
        </Button>
      </form>
    </div>
  );
}