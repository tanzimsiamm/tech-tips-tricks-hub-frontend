// frontend/src/types/posts.ts

import { IPopulatedUserFrontend } from './user'; // Import for populated user fields

// Frontend representation of an embedded comment
export interface ICommentFrontend {
  _id: string; // The ID of the comment
  user: IPopulatedUserFrontend; // Populated user in comments (author of the comment)
  text: string;
  createdAt: string; // ISO string for creation date
}

// Frontend representation of a post (Tech Tip)
export interface IPostFrontend {
  _id: string; // The ID of the post
  user: IPopulatedUserFrontend; // Populated author of the post
  title: string;
  content: string; // HTML content from the rich text editor
  category: 'Web' | 'Software Engineering' | 'AI' | 'Mobile' | 'Cybersecurity' | 'Data Science' | 'Other';
  tags?: string[]; // Array of strings for tags
  isPremium: boolean;
  upvotes: number;
  downvotes: number;
  comments?: ICommentFrontend[]; // Array of comments (can be populated)
  views: number;
  images?: string[]; // Array of image URLs
  createdAt: string; // ISO string for creation date
  updatedAt: string; // ISO string for last update date
}

// Frontend payload for creating a post (data sent from client to backend)
export interface ICreatePostPayloadFrontend {
  title: string;
  content: string;
  category: 'Web' | 'Software Engineering' | 'AI' | 'Mobile' | 'Cybersecurity' | 'Data Science' | 'Other';
  tags?: string[];
  isPremium?: boolean;
  images?: string[]; // Array of image URLs (if you're sending URLs) or handle File objects if using FormData directly
}

// Frontend payload for updating a post (all fields are optional for partial updates)
export interface IUpdatePostPayloadFrontend extends Partial<ICreatePostPayloadFrontend> {}

// Frontend payload for adding a comment to a post
export interface IFrontendAddCommentPayload {
  text: string;
}