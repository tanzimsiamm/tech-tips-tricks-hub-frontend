// frontend/src/types/user.ts
// This should contain the IProfile type used in useAuth, and any other user-related types
// Example:
export interface IFrontendUserProfile {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  image?: string;
  coverImg?: string;
  memberShip?: { takenDate: string; exp: string; package: { name: string; price: number; }; } | null;
  followers?: Array<{ _id: string; name: string; email: string; image?: string }>;
  following?: Array<{ _id: string; name: string; email: string; image?: string }>;
  isBlocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
}