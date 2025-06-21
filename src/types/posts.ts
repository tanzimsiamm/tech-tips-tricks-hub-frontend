// frontend/src/types/posts.ts
// Example (copy/adapt from backend's IPostDocument/TPost, ensuring ObjectIds are strings)
export interface IFrontendPost {
  _id: string;
  title: string;
  content: string;
  category: 'Web' | 'Software Engineering' | 'AI' | 'Mobile' | 'Cybersecurity' | 'Data Science' | 'Other';
  tags?: string[];
  isPremium: boolean;
  upvotes: number;
  downvotes: number;
  comments?: Array<{
    _id: string;
    user: { _id: string; name: string; email: string; image?: string }; // Populated user
    text: string;
    createdAt: string; // ISO string
  }>;
  views: number;
  images?: string[];
  createdAt: string;
  updatedAt: string;
  user: { _id: string; name: string; email: string; image?: string; role: string; }; // Populated author
}

export interface IFrontendCreatePostPayload {
  title: string;
  content: string;
  category: 'Web' | 'Software Engineering' | 'AI' | 'Mobile' | 'Cybersecurity' | 'Data Science' | 'Other';
  tags?: string[];
  isPremium?: boolean;
  images?: string[];
}

export interface IFrontendUpdatePostPayload extends Partial<IFrontendCreatePostPayload> {}

export interface IFrontendAddCommentPayload {
  text: string;
}